
const axios = require('axios')
const puppeteerExtra = require('puppeteer-extra');
const stealthPlugin = require('puppeteer-extra-plugin-stealth')
const chromium = require('@sparticuz/chromium');
const moment = require('moment');


const apiV1 = axios.create({ baseURL: process.env.BASE_URL_API_V1 })

async function updateBusiness(id, data){
  const response = await apiV1.patch(`business/${id}/`, data, {
      headers: {
          'Content-Type': 'application/json'
      }
  })

  return response.data;
}

async function createReviews(businessID, data){
  const response = await apiV1.post('reviews/', data, {
      headers: {
          'Content-Type': 'application/json'
      }
  })

  return response.data;
}



async function autoScrollUntilAllNewReviewsAreLoaded(page, totalNewReviews) {
  return await page.evaluate(async (totalNewReviews) => {
      const wrapper = document.querySelector('.m6QErb.DxyBCb.kA9KIf.dS8AEf.XiKgde');

      const totalReviewsLoaded = await new Promise((resolve, reject) => {
          const distance = 5000;
          const scrollDelay = 100;

          const timer = setInterval(async () => {
              wrapper.scrollBy(0, distance);

              await new Promise((resolve) => setTimeout(resolve, scrollDelay));

              const totalReviewsLoaded = Array.from(document.querySelectorAll(".jftiEf > div:first-child > div:first-child")).length

              if(totalReviewsLoaded >= totalNewReviews){
                  clearInterval(timer);
                  resolve(totalReviewsLoaded);
              }
          }, 200);
      });

      return totalReviewsLoaded
  }, totalNewReviews);
}

function convertRelativeDateGoogleReview(relativeDate) {
    const relativeDateArray = relativeDate.replace(" ago","").split(" ")

    relativeDateArray[0] = Number(relativeDateArray[0] === "a" || relativeDateArray[0] === "an" ? 1 : relativeDateArray[0])

    if(relativeDateArray[1] === "week" || relativeDateArray[1] === "weeks"){
        return moment().subtract(relativeDateArray[0]*7, "days")
    }

    return moment().subtract(relativeDateArray[0], relativeDateArray[1])
}

async function sortReviewsByMostRecent(page) {
    await page.evaluate( async () => {
      document.querySelector("button[data-value='Sort']").click();
      await new Promise((resolve, reject) => {
        const timer = setInterval(() => {
            if(document.querySelector("#action-menu > div[data-index='1']")){
              document.querySelector("#action-menu > div[data-index='1']").click()
              clearInterval(timer)
              resolve();
            }
        },400);
      });
    })
}
 
async function getGoggleReviewBusiness(businessURL, currentTotalReviewsInDatabase) {
  const result = {}

  puppeteerExtra.use(stealthPlugin());

  const browser = await puppeteerExtra.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
    protocolTimeout: 800000,
  });
  const page = await browser.newPage();

  try {
    await page.goto(businessURL);
  } catch (error) {
    throw new Error(`page go to - ${error} - ${businessURL}`);
  }

  await page.waitForNetworkIdle();

  await sortReviewsByMostRecent(page)

  const { generalRating, totalReviews } = await page.evaluate( async () => {
    return {
        generalRating: Number.parseFloat(document.querySelector('.jANrlb > .fontDisplayLarge').innerHTML.replace(",",".")),
        totalReviews: Number(document.querySelector('.jANrlb > .fontBodySmall').innerHTML.replace(" reviews", "")),
    }
  })

  const totalNewReviews = totalReviews - currentTotalReviewsInDatabase

  if(totalNewReviews > 0){
    const totalReviewsLoaded = await autoScrollUntilAllNewReviewsAreLoaded(page, totalNewReviews)

    const reviews = await page.evaluate( async (totalNewReviews) => {
      document.querySelectorAll(".jftiEf > div:first-child > div:first-child > div:last-child > div:nth-child(2) span > button").forEach(element => element.click())

      await new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            clearInterval(timer);
            resolve();
        },400);
      });

      return Array.from(document.querySelectorAll(".jftiEf > div:first-child > div:first-child")).slice(0,totalNewReviews).map(review => {
        let description = review.querySelector("div:last-child > div:nth-child(2) > .MyEned > span:first-child") ? review.querySelector("div:last-child > div:nth-child(2) > .MyEned > span:first-child").innerHTML : ""

        if(review.querySelector("div:last-child > div:nth-child(2) div[jslog]")){
          description += "\n" + Array.from(
              review.querySelectorAll("div:last-child > div:nth-child(2) div[jslog] > div")
          ).reduce((paragraphs, element) =>  paragraphs + Array.from(element.querySelectorAll("div")).reduce(
                  (lines, line) => lines + `${line.querySelector("span > span").innerHTML}\n`, ""
              ) + "\n", "")
        }

        return {
          reviewerProfilePicture: review.querySelector("div:first-child > button > img").getAttribute("src"),
          reviewerName: review.querySelector(".GHT2ce > div:last-child > .WNxzHc > button > .d4r55 ").innerHTML,
          rating: review.querySelector("div:last-child > .DU9Pgb > .kvMYJc").getAttribute("aria-label").replace(" stars","").replace(" star",""),
          approximateDate: review.querySelector("div:last-child > .DU9Pgb > .rsqaWe").innerHTML,
          description,
        }
      })
    }, totalNewReviews)

    result.generalRating = generalRating;
    result.totalNewReviews = totalNewReviews;
    result.reviews = reviews;
  }

  const pages = await browser.pages();
  await Promise.all(pages.map((page) => page.close()));

  browser.close();

  if ('reviews' in result && result.reviews.length > 0){
        result.reviews.forEach(review => {
            review.approximateDate = convertRelativeDateGoogleReview(review.approximateDate)
        })
  }

  return result;
};

module.exports.dispatch =async (event) => {
  try {
    const body = JSON.stringify(event.body);
    const { id  } = JSON.parse(body);

    const response = await apiV1.get(`business/${id}/`);
    const { url, general_rating: generalRating, total_reviews: totalReviews, ...rest } = response.data

    const data = await getGoggleReviewBusiness(url, 630)
    
    if(Object.keys(data).length > 0){
      if(generalRating !== data.generalRating){
        await updateBusiness(id, {
          "general_rating": data.generalRating,
          "total_reviews": data.totalReviews
        })
      } else{
        await updateBusiness(id, {
          "total_reviews": data.totalReviews
        })
      }

      Promise.all(data.reviews.map(review => {
        return createReviews(id, {
          "business": id,
          "profile_picture": review.reviewerProfilePicture,
          "name": review.reviewerName,
          "rating": Number(review.rating),
          "approximateDate": review.approximateDate,
          "description": review.description
        })
      }))
    }

    return {
      statusCode: 200,
      data,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        "error": error.message,
      })
    }
  }

  
}
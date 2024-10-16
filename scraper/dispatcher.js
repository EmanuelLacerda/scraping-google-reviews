
const puppeteerExtra = require('puppeteer-extra');
const stealthPlugin = require('puppeteer-extra-plugin-stealth')
const chromium = require('@sparticuz/chromium');
const moment = require('moment');

async function autoScroll(page) {
  await page.evaluate(async () => {
    const wrapper = document.querySelector('.m6QErb.DxyBCb.kA9KIf.dS8AEf.XiKgde');

    await new Promise((resolve, reject) => {
      let totalHeight = 0;
      const distance = 5000;
      const scrollDelay = 3000;

      const timer = setInterval(async () => {
          const scrollHeightBefore = wrapper.scrollHeight;
          wrapper.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeightBefore) {
              totalHeight = 0;
              await new Promise((resolve) => setTimeout(resolve, scrollDelay));

              const scrollHeightAfter = wrapper.scrollHeight;

              if (scrollHeightAfter === scrollHeightBefore){
                  clearInterval(timer);
                  resolve();
              }
          }
      }, 200);
    });
  });
}

function convertRelativeDateGoogleReview(relativeDate) {
    const momentTimeUnits = {
        "segundo": "seconds",
        "segundos": "seconds",
        "minuto": "minutes",
        "minutos": "minutes",
        "dia": "days",
        "dias": "days",
        "mês": "months",
        "meses": "months",
        "ano": "years",
        "anos": "years",
    }

    const relativeDateArray = relativeDate.replace(" atrás","").split(" ")

    relativeDateArray[0] = Number(relativeDateArray[0] === "um" || relativeDateArray[0] === "uma" ? 1 : relativeDateArray[0])

    if(relativeDateArray[1] === "semana" || relativeDateArray[1] === "semanas"){
        return moment().subtract(relativeDateArray[0]*7, "days")
    }

    return moment().subtract(relativeDateArray[0], momentTimeUnits[relativeDateArray[1]])
}

async function sortReviewsByMostRecent(page) {
    await page.locator("button[data-value='Ordenar']").click();
    await page.locator("#action-menu > div[data-index='1']").click();
}
 
async function getGoggleReviewBusiness(businessURL) {
    puppeteerExtra.use(stealthPlugin());

    const browser = await puppeteerExtra.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();

    try {
      await page.goto(businessURL);
    } catch (error) {
      throw new Error(`page go to - ${error} - ${businessURL}`);
    }

    await page.waitForNetworkIdle();

    await sortReviewsByMostRecent(page)

    await autoScroll(page)

    const result = await page.evaluate( async () => {
        document.querySelectorAll(".jftiEf > div:first-child > div:first-child > div:last-child > div:nth-child(2) > .MyEned > span > button").forEach(element => element.click())

        await new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                clearInterval(timer);
                resolve();
            },400);
        });

        return {
            generalRating: document.querySelector('.jANrlb > .fontDisplayLarge').innerHTML,
            totalReviews: document.querySelector('.jANrlb > .fontBodySmall').innerHTML,
            reviews: Array.from(document.querySelectorAll(".jftiEf > div:first-child > div:first-child")).map(review => {
                return {
                    reviewerProfilePicture: review.querySelector("div:first-child > button > img").getAttribute("src"),
                    reviewerName: review.querySelector(".GHT2ce > div:last-child > .WNxzHc > button > .d4r55 ").innerHTML,
                    rating: review.querySelector("div:last-child > .DU9Pgb > .kvMYJc").getAttribute("aria-label").replace(" estrelas","").replace(" estrela",""),
                    approximateDate: review.querySelector("div:last-child > .DU9Pgb > .rsqaWe").innerHTML,
                    description: review.querySelector("div:last-child > div:nth-child(2) > .MyEned > span:first-child") ? review.querySelector("div:last-child > div:nth-child(2) > .MyEned > span:first-child").innerHTML : "",
                }
            })
        };
    });

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
    const { url } = JSON.parse(event.body);

    const data = await getGoggleReviewBusiness(url);

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
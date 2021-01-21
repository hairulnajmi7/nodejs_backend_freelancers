const puppeteer = require('puppeteer');
// const cheerio = require('cheerio');
const con = require('./config/db.config');

const b = (

    async() => {
        const browser = await puppeteer.launch({
            headless: false
        });
        const page = await browser.newPage();
        await page.goto('https://www.upwork.com/l/my/', {
            waitUntil: 'load'
        });

        await page.setViewport({
            width: 1200,
            height: 800
        });

        var data;
        var count = 1;
        var ListName = [];
        var ListProfession = [];
        var ListHourlyRates = [];
        var ListExperiences = [];
        var ListCompletedProjects = [];
        var ListCountries = [];
        var ListImages = [];

        while (count < 3) {

            // await page.click(`div > div.js-pager-container > div.text-center.hidden-xs.wk-pager-scroll > nav > ul > li:nth-child(${count}) > a`);
            // await autoScroll(page);

            data = await page.evaluate(() => {

                var names = document.querySelectorAll("div > div > div > div > div.vs-position-relative.d-flex.vs-align-items-start > div.pl-5.pr-0.media-body > div.name-link > a");
                var professions = document.querySelectorAll("div > div  > div > div > div.vs-position-relative.d-flex.vs-align-items-start > div.pl-5.pr-0.media-body > div.name-link > p");
                var hourlyRates = document.querySelectorAll("div > div  > div > div > div.vs-position-relative.d-flex.vs-align-items-start > div.mr-5.text-center > div.hourly-rate-wrapper.d-block.nowrap > strong");
                var experiences = document.querySelectorAll("div > div  > div > div > div.skills-container.vs-flex-wrap.mt-10.width-animation > span > span");
                var completedProjects = document.querySelectorAll(" div > div > div > div > div.vs-position-relative.d-flex.vs-align-items-start > div.pl-5.pr-0.media-body > div.top-rated-address.width-animation.row > div > span > div > div > small");
                var countries = document.querySelectorAll("div > div > div > div > div.vs-position-relative.d-flex.vs-align-items-start > div.pl-5.pr-0.media-body > div.top-rated-address.width-animation.row > small");
                var images = document.querySelectorAll(" div > div > div > div > div.vs-position-relative.d-flex.vs-align-items-start > div.mr-5.text-center > div.mb-10.avatar-container > picture > img");

                var name = Array.from(names, name => name.innerText);
                var profession = Array.from(professions, profession => profession.innerText);
                var hourlyRate = Array.from(hourlyRates, hourlyRate => hourlyRate.innerText);
                var experience = Array.from(experiences, experience => experience.innerText);
                var completedProject = Array.from(completedProjects, completedProject => completedProject.innerText);
                var country = Array.from(countries, country => country.innerText);
                var image = Array.from(images, image => image.src);


                return {
                    name,
                    profession,
                    hourlyRate,
                    experience,
                    completedProject,
                    country,
                    image,
                };
            });

            count++;

            // console.log(data.name.length);
            for (var i = 0; i < data.name.length; i++) {
                ListName.push(data.name[i]);
                ListProfession.push(data.profession[i]);
                ListHourlyRates.push(data.hourlyRate[i]);
                ListExperiences.push(data.experience[i]);
                ListCompletedProjects.push(data.completedProject[i]);
                ListCountries.push(data.country[i]);
                ListImages.push(data.image[i]);
            }

        }

        for (i = 0; i < data.name.length; i++) {
            var sql = "INSERT INTO freelancers (name, profession,hourlyRate, experience, completedProject, country, image) VALUES ?";
            var values = [
                [data.name[i], data.profession[i], data.hourlyRate[i], data.experience[i], data.completedProject[i], data.country[i], data.image[i]],
                ];

                con.query(sql, [values], function(err) {
                if (err) throw err;
                console.log("Inserted Sucessfully");
            });
        }

        console.log(ListName);
        console.log(ListProfession);
        console.log(ListHourlyRates);
        console.log(ListExperiences);
        console.log(ListCompletedProjects);
        console.log(ListCountries);
        console.log(ListImages);

        await browser.close();

    })();

async function autoScroll(page) {
    await page.evaluate(async() => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

module.exports = b;
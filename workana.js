const puppeteer = require('puppeteer');
// const cheerio = require('cheerio');
const con = require('./config/db.config');

const b = (

    async() => {
        const browser = await puppeteer.launch({
            headless: false
        });
        const page = await browser.newPage();
        await page.goto('https://www.workana.com/en/freelancers/malaysia', {
            waitUntil: 'load'
        });
        // await page.waitForSelector('.result_text a');

        await page.setViewport({
            width: 1200,
            height: 800
        });

        // const searchButtonNodeSelector = "div > div.js-pager-container > div.text-center.hidden-xs.wk-pager-scroll > nav > ul > li:nth-child(2) > a";
        // await page.click(searchButtonNodeSelector);

        var data;
        var count = 1;
        var ListName = [];
        var ListProfession = [];
        var ListHourlyRates = [];
        var ListExperiences = [];
        var ListCompletedProjects = [];
        var ListCountries = [];
        var ListImages = [];
        // var ListDescription = [];
        // var ListRatings = [];

        while (count < 20) {

            await page.click(`div > div.js-pager-container > div.text-center.hidden-xs.wk-pager-scroll > nav > ul > li:nth-child(${count}) > a`);
            await autoScroll(page);

            data = await page.evaluate(() => {

                var names = document.querySelectorAll("div > div > div.col-sm-7.col-md-8 > div.row > div.worker-details.col-xs-12.col-sm-7.col-md-9.text-center-xs > span.h3.user-name > a > span");
                var professions = document.querySelectorAll("div > div > div.col-sm-7.col-md-8 > div.row > div.worker-details.col-xs-12.col-sm-7.col-md-9.text-center-xs > h5");
                var hourlyRates = document.querySelectorAll("div > div > div.col-sm-5.col-md-4.col-xs-12 > div.worker-details.text-center-sm > h4");
                var experiences = document.querySelectorAll("div > div > div.col-sm-7.col-md-8 > div.skills.hidden-xs > div");
                var completedProjects = document.querySelectorAll("div > div > div.col-sm-5.col-md-4.col-xs-12 > div.worker-details.text-center-sm > p > span");
                var countries = document.querySelectorAll("div > div > div.col-sm-7.col-md-8 > div.row > div.worker-details.col-xs-12.col-sm-7.col-md-9.text-center-xs > span.country > span > a");
                var images = document.querySelectorAll("div> div > div.col-sm-7.col-md-8 > div.row > div.col-xs-12.col-sm-5.col-md-3.text-center > div > a > img"); 
                // var descriptions = document.querySelectorAll(" div > div > div.col-sm-7.col-md-8 > div.worker-description > div > div.expander-details > p");
                // var ratings = document.querySelectorAll("div > div > div.col-sm-7.col-md-8 > div.row > div.worker-details.col-xs-12.col-sm-7.col-md-9.text-center-xs > label > span > span");


                var name = Array.from(names, name => name.innerText);
                var profession = Array.from(professions, profession => profession.innerText);
                var hourlyRate = Array.from(hourlyRates, hourlyRate => hourlyRate.innerText);
                var experience = Array.from(experiences, experience => experience.innerText);
                var completedProject = Array.from(completedProjects, completedProject => completedProject.innerText);
                var country = Array.from(countries, country => country.innerText);
                var image = Array.from(images, image => image.src);
                // var description = Array.from(descriptions, description => description.innertText);
                // var rating = Array.from(ratings, rating => rating.innerText);

                // for (var i = 0; i < name.length; i++) {
                //     ListName.push(name[i]);
                // }
                return {
                    name,
                    profession,
                    hourlyRate,
                    experience,
                    completedProject,
                    country,
                    image,
                    // description
                    // rating
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
                // ListDescription.push(data.description[i]);
                // ListRatings.push(data.rating[i]);
            }

            for (i = 0; i < data.name.length; i++) {
                var sql = "INSERT INTO freelancers (name, profession,hourlyRate, experience, completedProject, country, image) VALUES ?";
                var values = [
                    [data.name[i], data.profession[i], data.hourlyRate[i], data.experience[i], data.completedProject[i], data.country[i], data.image[i]]
                    ];
    
                    con.query(sql, [values], function(err) {
                    if (err) throw err;
                    console.log("Inserted Sucessfully");
                });
            }
        }

        console.log(ListName);
        console.log(ListProfession);
        console.log(ListHourlyRates);
        console.log(ListExperiences);
        console.log(ListCompletedProjects);
        console.log(ListCountries);
        console.log(ListImages);
        // console.log(ListDescription);
        // console.log(ListRatings);

        // "#workers > div > div.js-pager-container > div.text-center.hidden-xs.wk-pager-scroll > nav > ul > li:nth-child(2) > a"
        // await page.$('#workers > div > div.js-pager-container > div.text-center.hidden-xs.wk-pager-scroll > nav > ul > li:nth-child(2) > a');
        // Get the "viewport" of the page, as reported by the page.


        // for (i = 0; i < data.name.length; i++) {
        //     var sql = "INSERT INTO freelancers (name, profession, hourlyRate, experience, completedProject, country) VALUES (data.name, data.profession, data.hourlyRate, data.experience, data.completedProject, data.country)";
        //     con.query(sql, function (err, result) {
        //         if (err) throw err;
        //         console.log("All freelancer's record inserted");
        //     });
        // }

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
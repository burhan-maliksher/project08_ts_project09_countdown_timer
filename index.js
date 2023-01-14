#! /usr/bin/env node 
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import { titleTimer } from "./src/_title.js";
class CountdownTimer {
    // run the app
    async Run() {
        await this.AppTitle();
        await this.App();
    }
    // autor watermark on app at the begening
    async AppTitle() {
        const title = chalkAnimation.neon(`__________________Welcome to M.B Countdown Timer App__________________`);
        await titleTimer();
        title.stop();
        console.log(chalk.bgRed.italic(`                                                             Autor:"M.B"`));
    }
    //  app
    async App() {
        //user input in minutes
        const usrInput = await inquirer.prompt([{
                type: "input",
                name: "time",
                message: "please set timer in minutes",
                validate: function (input) {
                    let int = parseInt(input);
                    if (input !== "" && Number.isInteger(int)) {
                        return true;
                    }
                    else {
                        return "invalid input";
                    }
                }
            }]);
        // user input time in minutes
        let cDown = parseInt(usrInput.time);
        // user input time in milliseconeds
        let count = parseInt(usrInput.time) * 60 * 1000;
        const date = new Date();
        // time to stop 
        const timer = date.getTime() + count;
        let secCounter = 0;
        let minCounter = cDown;
        console.log(chalk.green(`   Count Down \n      ${minCounter}.${secCounter} `));
        const countDown = setInterval(() => {
            const currentDate = new Date();
            //time after every second 
            const currentTime = currentDate.getTime();
            if (currentTime <= timer) {
                console.clear();
                if (secCounter == 0) {
                    secCounter = 59;
                    if (minCounter > 0) {
                        minCounter--;
                    }
                }
                let changecolor = minCounter == 0 && secCounter < 10 ? chalk.red : chalk.green;
                console.log(changecolor(`   Count Down \n      ${minCounter}.${secCounter} `));
                secCounter--;
            }
            else {
                console.clear();
                secCounter = 0;
                console.log(chalk.red(`   Count Down \n      ${minCounter}.${secCounter} `));
                console.log(chalk.cyan(`Count Down Completed !`));
                clearInterval(countDown);
                //repeat
                const repeat = async () => {
                    const input = await inquirer.prompt([{
                            type: "confirm",
                            name: "decision",
                            message: "press y to repeat",
                        }]);
                    const repeatORnot = input.decision;
                    if (repeatORnot == true) {
                        this.App();
                    }
                    else {
                        console.log(chalk.bgBlueBright("Thanks for using M.B Count Down App"));
                    }
                    //end of repeat
                };
                repeat();
            }
            // end of intervel      
        }, 1000);
        // end of app method
    }
}
let run = new CountdownTimer();
run.Run();

#!/usr/bin/env node

const inquirer = require('inquirer')
const fs = require('fs')
const cmd = require('node-cmd')
const ncp = require('ncp').ncp
const clone = require('git-clone')

ncp.limit = 16;

let questions = [
    {
        type: 'input',
        name: 'project_name',
        message: 'Project name:'
    },
    {
        type: 'list',
        name: 'styles',
        message: 'Styles Library:',
        choices: [
            'Bootstrap',
            'InuitCSS',
            'Bulma',
            new inquirer.Separator(),
            'None'
        ]
    },
    {
        type: 'checkbox',
        name: 'features',
        message: 'Required Functionality:',
        choices: [
            {name: 'HTML Templates'},
            {name: 'Backend'},
            {name: 'Sass Processing'},
            {name: 'ES6/7'}
        ]
    },
]


inquirer.prompt(questions).then(answers => {
    let manifest = {
        name: answers.project_name,
        styles: answers.styles,
        features: answers.features
    }
    let directory = './' + manifest.name

    // create output directory
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory)
    }

    // write manifest file which contains all dynamic project data
    // fs.writeFile(directory + '/manifest.json', JSON.stringify(manifest), function (error) {
    //     if (error) throw error
    // })

    // ncp('./app', directory, error => {
    //     if (error) throw error

    //     console.log('Your project was generated successfully at: ' + directory + '/')
    // })

    // fs.copyFile('./app/README.md', directory + '/README.md', error => {
    //     if (error) throw error

    //     console.log('README file generated at ' + directory + '/README.md')
    // })

    // switch (answers.styles) {
    //     case 'Bootstrap':
    //         clone('https://github.com/bwasilewski/build-starter', directory, error => {
    //             if (error) throw error;
    //         })
    //         break;
    //     case 'InuitCSS':
    //         clone('https://github.com/bwasilewski/gas-basic-inuitcss.git', directory, error => {
    //             if (error) throw error;
    //         })
    //         break;
    //     case 'Bulma':
    //         clone('https://github.com/bwasilewski/gas-basic-bulma.git', directory, error => {
    //             if (error) throw error;
    //         })
    //         break;
    //     case 'None':
    //         clone('https://github.com/bwasilewski/build-starter', directory, error => {
    //             if (error) throw error;
    //         })
    //         break;
    }

    console.log('-----------------------------------')
    console.log('Project scaffolded at ' + directory)
    console.log('To get started, enter the following:')
    console.log('-----------------------------------')
    console.log('$ cd ' + directory)
    console.log('$ yarn install')
    console.log('$ gulp')
    console.log('-----------------------------------')
})
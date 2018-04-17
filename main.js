#!/usr/bin/env node

const inquirer = require('inquirer')
const fs = require('fs')
const cmd = require('node-cmd')
const ncp = require('ncp').ncp

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
            'Foundation',
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
    fs.writeFile(directory + '/manifest.json', JSON.stringify(manifest), function (error) {
        if (error) throw error
    })

    ncp('./src', directory, error => {
        if (error) throw error

        console.log('Your project was generated successfully at: ' + directory + '/')
    })

    // fs.copyFile('./src/README.md', directory + '/README.md', error => {
    //     if (error) throw error

    //     console.log('README file generated at ' + directory + '/README.md')
    // })

    console.log('Styles: ', answers.styles)
    console.log('Features: ', answers.features)
})
#!/usr/bin/env node

const inquirer = require('inquirer')
const fs = require('fs-extra')
const cmd = require('node-cmd')
const ncp = require('ncp').ncp
const gip = require('get-installed-path')
let packagepath = ''

ncp.limit = 16;

let questions = [
    {
        type: 'input',
        name: 'project_name',
        message: 'Project Name:'
    },
    {
        type: 'list',
        name: 'template',
        message: 'Project Template:',
        choices: [
            'gas-basic',
            'gas-basic-inuitcss',
            'gas-basic-bulma'
        ]
    },
]


initialize();


function initialize() {
    gip.getInstalledPath('gas-generator').then(path => {
        packagepath = path;

        promptUser()
    }).catch(err => {
        console.log('error: ', err)
    })
}


function promptUser() {
    inquirer.prompt(questions).then(function (answers) {
        writeFiles(answers)
    });
}


function writeFiles(answers) {
    let manifest = {
        project_name: answers.project_name,
        template: answers.template
    }
    let manifeststr = JSON.stringify(manifest, null, 2) + '\n'
    let directory = process.cwd() + '/' + manifest.project_name
    let templatepath = '/app/' + answers.template
    
    fs.ensureDir(directory, err => {
        if (err) return console.error(err)

        // write manifest file which contains all dynamic project data
        fs.writeFile(directory + '/manifest.json', manifeststr, err => {
            if (err) return console.error(err)
        })

        fs.copy(packagepath + templatepath, directory, err => {
            if (err) return console.error(err)
        })
    })

    
    // fs.copy(packagepath + templatepath, process.cwd(), err => {
    //     if (err) return console.error(err)

    //     // this is wrong, don't do it 
    //     // fs.remove(process.cwd() + '/.git', errr => {
    //     //     if (errr) return console.log(errr)
    //     // })
    // })

    console.log('-----------------------------------')
    console.log('Project scaffolded at ' + directory)
    console.log('To get started, enter the following:')
    console.log('-----------------------------------')
    console.log('$ cd ' + directory)
    console.log('$ yarn install')
    console.log('$ gulp')
    console.log('-----------------------------------')
}


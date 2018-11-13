#!/usr/bin/env node
/**
 * Module dependencies.
 */

const program = require('commander');
const fs = require('fs');
const {join} = require('path');
const {render} = require('ejs');

function getTemplate(templateName) {
    return fs.readFileSync(`${__dirname}/templates/${templateName}`, 'utf-8');
}

function renderTemplate(template, obj) {
    return render(template, obj);
}

function saveTemplate(path, html) {
    fs.writeFileSync(path, html);
}

program
    .version('0.1.0')
    .description('Notores development CLI');

program
    .command('add <name>')
    .description('Add entity')
    .action((name) => {
        console.log('Adding', name);
        console.log(process.cwd());

        const appDir = join(process.cwd(), '/app');
        const doesAppDirExist = fs.existsSync(appDir);
        if (!doesAppDirExist) {
            console.log('Directory /app doesn\'t exist...');
            console.log('Creating /app folder');
            fs.mkdirSync(appDir);
        }

        console.log('Creating module');

        const obj = {
            Name: name.charAt(0).toUpperCase() + name.substr(1),
            name
        };

        fs.mkdirSync(`${appDir}/${obj.name}`);

        const appComponents = fs.readdirSync(`${__dirname}/templates`);

        for (let componentName of appComponents) {
            try {
                const template = getTemplate(componentName);
                const rendered = renderTemplate(template, obj);
                if (componentName === 'module.test.js') {
                    const filename = `${obj.name}.test.js`;
                    saveTemplate(`${appDir}/${obj.name}/${filename}`, rendered);
                    console.log('Loading component', filename);
                } else if (componentName === 'module.test.json') {
                    const filename = `${obj.name}.test.json`;
                    saveTemplate(`${appDir}/${obj.name}/${filename}`, rendered);
                    console.log('Loading component', filename);
                } else {
                    saveTemplate(`${appDir}/${obj.name}/${componentName}`, rendered);
                    console.log('Loading component', componentName);
                }
            } catch (e) {
                console.log('error', e);
            }
        }
    });


program.parse(process.argv);


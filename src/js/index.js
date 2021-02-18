const React = require('react');
const ReactDOM = require('react-dom');

const _ = require('lodash');

const ComponentExample = require('./component-example');

const SubjectNewButton = require('./buttons/subject/subject-new-button');
const SubjectNameInput = require('./inputs/subject/subject-name-input');

const LoadTemplate = require('./templates/load-template');

import '../sass/home.scss';

// ReactDOM.render(
// 	element,
// 	document.getElementById('root')
// );

if (typeof(Storage) == 'undefined') {
	console.error("This browser does not support localStorage.");
}

var localStorage = window.localStorage;
var loaded = false;


window.app = { content: [] };

var data = { content: [] };
// if (localStorage.getItem('data').length !== 0) {
// 	data = { content: localStorage.getItem('data') };
// }
// else {
// 	data = { content: [] };
// }

if (localStorage.getItem('data')) {
	// let jsonToObject = JSON.parse(localStorage.getItem('data'));

	// console.log(jsonToObject);

	// data.content = [jsonToObject];

	// let templateData = JSON.parse(localStorage.getItem('data'));
	data.content = JSON.parse(localStorage.getItem('data'));

	console.log(data);

	ReactDOM.render(
		<LoadTemplate data={ data }/>,
		document.getElementById('root')
	);
	// console.log(data);
}

// console.log(window.app);

document.addEventListener('keypress', function (e)  {
	if (e.key == 'n') {

		var subjectPanels = [];
		_.each(window.app.content, function (subjectPanel) {
			subjectPanels.push(subjectPanel.toJson());
		});

		let jsonData = JSON.stringify(subjectPanels);
		console.log(JSON.parse(jsonData));

		localStorage.setItem('data', jsonData);
		console.log('Saved.');
	}

	if (e.key == 'm') {
		console.log(localStorage.getItem('data'));
	}
});

setInterval(() => {

	var subjectPanels = [];
	_.each(window.app.content, function (subjectPanel) {
		subjectPanels.push(subjectPanel.toJson());
	});

	let jsonData = JSON.stringify(subjectPanels);
	localStorage.setItem('data', jsonData);

	console.log('saved');
}, 1000);

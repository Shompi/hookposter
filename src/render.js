let submitTime = 0;
const tenseconds = 10000;
const container = document.getElementById('global-container');

function checkEmpty() {
	const webhookURL = document.getElementById('webhookURL');

	if (webhookURL.value === '') {
		webhookURL.className = 'input is-danger';

	}
	else
		webhookURL.className = 'input is-link';
}

async function post() {
	console.log('submitting...');

	if (checkEmpty())
		return;

	if (Date.now() <= submitTime + tenseconds)
		return;

	const webhookURL = document.getElementById('webhookURL').value;
	const embedcolor = document.getElementById('color').value || 0x00ff00;
	const embedtitle = document.getElementById('title').value;
	const embeddescription = document.getElementById('description').value;
	const embedfooter = document.getElementById('footer').value;
	const embedthumb = document.getElementById('thumbnail').value;
	const embedimage = document.getElementById('image').value;
	const embedcontent = document.getElementById('content').value;
	const options = {
		content: embedcontent,
		embeds: [
			{
				color: Number(`0x${[...embedcolor].slice(1, embedcolor.length).join()}`),
				title: embedtitle,
				description: embeddescription,
				footer: {
					text: embedfooter,
				},
				thumbnail: {
					url: embedthumb
				},
				image: {
					url: embedimage
				}
			}
		]
	}

	const response = await fetch(webhookURL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(options),
	}).catch(err => { console.log(err); return null; });

	if (!response)
		return;

	submitTime = Date.now();
}
var locators = {
	"threadsList": "#sidebar-group-right-panel .flex.border-slate-300",
	"threadSections": "gap-3",	// inside a thread
	"commentType": ".MuiChip-root",	// inside a section
	"commentLevel": "blockquote",	// inside a section
	"text": "div.whitespace-pre-wrap"	// inside a section
};

function getComment(div) {
	let cType = div.querySelector(locators.commentType);
	let comment = {
		"author": div.getElementsByTagName("a")[0].innerText,
		"severity": cType.getAttribute("aria-label"),
		"label": cType.querySelector("span").innerText
	};
	let cLevel = div.getElementsByTagName("blockquote");
	comment.location = cLevel.length ? cLevel[0].innerText : "root";
	comment.text = div.querySelector(locators.text).innerText;

	return comment
}

function getReplies(divs) {
	let replies = [];
	for (div of divs) {
		replies.push({
			"author": div.getElementsByTagName("a")[0].innerText,
			"text": div.querySelector(locators.text).innerText
		})
	}

	return replies
}

let threads = document.querySelectorAll(locators.threadsList);

let threadsList = [];

for (thread of threads) {
	let sections = Array.from(thread.getElementsByClassName(locators.threadSections));
	let comment = getComment(sections[0]);
	comment.replies = sections.length > 1 ? getReplies(sections.slice(1)) : [];

	threadsList.push(comment)
}

threadsList.reverse()
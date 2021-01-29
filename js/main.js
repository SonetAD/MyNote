class Database {
	constructor() {
		this.mynote_title = JSON.parse(localStorage.getItem('mynote_title'));
		this.mynote_note = JSON.parse(localStorage.getItem('mynote_note'));
		this.mynote_date = JSON.parse(localStorage.getItem('mynote_date'));

		if (
			this.mynote_title === null ||
			this.mynote_note === null ||
			this.mynote_date === null
		) {
			localStorage.setItem('mynote_title', JSON.stringify([]));
			localStorage.setItem('mynote_note', JSON.stringify([]));
			localStorage.setItem('mynote_date', JSON.stringify([]));

			this.mynote_title = [];
			this.mynote_note = [];
			this.mynote_date = [];
		}
	}

	setData(title = '', note = '', date = '') {
		this.mynote_title.unshift(title);
		this.mynote_note.unshift(note);
		this.mynote_date.unshift(date);

		localStorage.setItem('mynote_title', JSON.stringify(this.mynote_title));
		localStorage.setItem('mynote_note', JSON.stringify(this.mynote_note));
		localStorage.setItem('mynote_date', JSON.stringify(this.mynote_date));
	}
}

class GUI extends Database {
	constructor() {
		super();
		this.addButton = document.querySelector('.add');
		this.notes = document.querySelector('.notes');
		this.mainpage = document.querySelector('.mainpage');
		this.search = document.querySelector('.search');
		this.searchInput = document.querySelector('.searchinput');
		this.nocontent = document.querySelector('.nocontent');
		this.noteInputPage = document.querySelector('.noteinputpage');
		this.savebtn = document.querySelector('.savebtn');
		this.noteform = document.querySelector('.noteform');
		this.singleNotePage = document.querySelector('.singlenotepage');
		this.singleNoteTitle = document.querySelector('.singlenotetitle');
		this.singleNoteDate = document.querySelector('.singlenotedate');
		this.singleNotebody = document.querySelector('.singlenotebody');
		this.homeBtn = document.querySelector('.home');
		this.containerForDelOrEdit = document.querySelector(
			'.containerfordeloredit'
		);
	}

	alertMessage(parentDiv, targetDiv, text, time, clr, bgclr) {
		let createAlertDiv = document.createElement('div');
		createAlertDiv.className = 'alert';
		createAlertDiv.textContent = text;
		createAlertDiv.style.backgroundColor = bgclr;
		createAlertDiv.style.color = clr;

		parentDiv.insertBefore(createAlertDiv, targetDiv);

		setTimeout(function () {
			document.querySelector('.alert').remove();
		}, time);
	}

	addNote() {
		this.addButton.addEventListener('click', function () {
			mynote.mainpage.style.display = 'none';
			mynote.noteInputPage.style.display = 'block';
		});
		this.noteform.addEventListener('submit', function (e) {
			let notetitle = document.querySelector('.notetitle');
			let notebody = document.querySelector('.notebody');
			let monthList = [
				'Jan',
				'Feb',
				'Mar',
				'Apr',
				'May',
				'June',
				'July',
				'Aug',
				'Sept',
				'Oct',
				'Nov',
				'Dec',
			];

			let d = new Date();
			let currentTime = `${d.getUTCDate()} ${
				monthList[d.getUTCMonth()]
			},${d.getUTCFullYear()}`;

			if (notetitle.value != '' && notebody.value != '') {
				mynote.setData(notetitle.value, notebody.value, currentTime);
				mynote.noteInputPage.style = 'none';
				mynote.mainpage.style.display = 'block';

				let saveAlert = 'Note Saved';

				mynote.alertMessage(
					mynote.mainpage,
					mynote.notes,
					saveAlert,
					1500,
					'#333',
					'gold'
				);
				window.location.reload();
			} else if (notetitle.value == '') {
				let errorText = 'Please enter a title.';
				mynote.alertMessage(
					mynote.noteform,
					notetitle,
					errorText,
					1000,
					'white',
					'red'
				);
			} else {
				let errorText = 'Please write a note';
				mynote.alertMessage(
					mynote.noteform,
					notebody,
					errorText,
					1000,
					'white',
					'red'
				);
			}
			e.preventDefault();
		});
	}

	displayNote() {
		if (this.mynote_title.length != 0) {
			for (let i = 0; i < this.mynote_title.length; i++) {
				// create main note div
				let createDiv = document.createElement('div');
				createDiv.className = `${i} eachnote everyelement`;

				// create note title and append in div
				let createTitle = document.createElement('h1');
				createTitle.className = `${i} eachnotetitle everyelement`;
				createTitle.textContent = this.mynote_title[i];
				createDiv.appendChild(createTitle);

				// create date and append in div
				let createDate = document.createElement('h4');
				createDate.textContent = this.mynote_date[i];
				createDate.classList = `${i} eachnotedate everyelement`;
				createDiv.appendChild(createDate);

				// create notebody and append it in div
				let createNote = document.createElement('p');
				createNote.textContent = this.mynote_note[i];
				createNote.className = `${i} eachnotebody everyelement`;
				createDiv.appendChild(createNote);

				// append the div into main div
				this.notes.appendChild(createDiv);
			}
		} else {
			this.search.style.display = 'none';
			this.nocontent.textContent = 'No note found.';
		}
	}

	displaySingleNote() {
		this.notes.addEventListener('click', function (e) {
			if (e.target.classList.contains('everyelement')) {
				let index = parseInt(e.target.classList[0]);
				mynote.mainpage.style.display = 'none';
				mynote.singleNotePage.style.display = 'block';

				mynote.singleNoteTitle.textContent = mynote.mynote_title[index];

				mynote.singleNoteDate.textContent = `Date : ${mynote.mynote_date[index]}`;
				mynote.singleNotebody.textContent = mynote.mynote_note[index];
			}

			e.preventDefault();
		});

		this.homeBtn.addEventListener('click', function (e) {
			mynote.mainpage.style.display = 'block';
			mynote.singleNotePage.style.display = 'none';

			e.preventDefault();
		});
	}

	searchNotes() {
		this.search.addEventListener('submit', function (e) {
			e.preventDefault();
		});
		mynote.searchInput.addEventListener('keyup', function () {
			let eachNote = document.querySelectorAll('.eachnote');
			if (mynote.searchInput.value != '') {
				eachNote.forEach(function (note) {
					note.style.display = 'none';
				});
			} else {
				eachNote.forEach(function (note) {
					note.style.display = 'inline-block';
				});
			}
			let eachNoteTitle = document.querySelectorAll('.eachnotetitle');
			let checkingSearchMach = false;
			eachNoteTitle.forEach(function (n) {
				if (
					n.textContent
						.toLowerCase()
						.includes(mynote.searchInput.value.toLowerCase())
				) {
					n.parentElement.style.display = 'inline-block';
					checkingSearchMach = true;
				}
			});
			if (checkingSearchMach == false) {
				mynote.nocontent.textContent = 'Nothing found';
				checkingSearchMach = false;
			} else {
				mynote.nocontent.textContent = '';
			}
		});
	}

	deloredit() {
		let getEveryElement = document.querySelector('.everyelement');

		this.notes.addEventListener('mousedown', function (e) {
			if (e.target.classList.contains('everyelement')) {
				console.log(e.target);
				mynote.mainpage.style.position = 'fixed';
				mynote.mainpage.style.top = 0;
				mynote.mainpage.style.zIndex = 0;
				mynote.mainpage.style.opacity = 0.7;
				mynote.containerForDelOrEdit.style.display = 'flex';
			}
			e.preventDefault();
		});
	}
}

let mynote = new GUI();
mynote.displayNote();
mynote.searchNotes();
mynote.deloredit();
mynote.displaySingleNote();
mynote.addNote();

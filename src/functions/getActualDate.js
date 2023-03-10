const getActualDate = () => {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!
	var yyyy = today.getFullYear();
	var h = today.getHours();
	var min = today.getMinutes();

	if (dd < 10) {
		dd = "0" + dd;
	}

	if (mm < 10) {
		mm = "0" + mm;
	}

	if (h < 10) {
		h = "0" + h;
	}

	if (min < 10) {
		min = "0" + min;
	}

	today = `${yyyy}-${mm}-${dd}T${h}:${min}`;
	return today;
};

export default getActualDate;

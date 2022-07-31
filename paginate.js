class Paginate {
    #oldData;
    #data = [];
    #currentPage;
    #perpage;

    constructor(array = [], perpage, currentPage = 1, callback = null) {
        this.#currentPage = currentPage;
        this.#perpage = perpage;

        var start = 0;
        var indexstart = 0;
        var tamp = [];

        for (var i = 0; i < array.length; i++) {
            tamp[indexstart] = array[i];
            indexstart++;
            if ((i + 1) % perpage == 0) {
                this.#data[start] = tamp;
                tamp = [];
                start++;
                indexstart = 0;
            }
        }

        if (tamp.length > 0) {
            this.#data[start] = tamp;
        }

        if (callback != null) {
            var default_data = this.toPage(currentPage);
            callback(default_data);
        }
        this.#oldData = this.#data;
    }

    toPage(page, callback = null) {
        if (page > this.#data.length || page < 1) {
            return null;
        }
        if (callback != null) {
            callback(this.#data[page - 1]);
        }
        this.#currentPage = page;
        return this.#data[page - 1];
    }

    nextPage(callback = null) {
        if (this.#currentPage >= this.#data.length) {
            return null;
        }
        this.#currentPage++;
        if (callback != null) {
            callback(this.#data[this.#currentPage - 1]);
        }
        var response = this.#data[this.#currentPage - 1];
        return response;
    }

    prevPage(callback = null) {
        if (this.#currentPage <= 1) {
            return null;
        }
        this.#currentPage--;
        if (callback != null) {
            callback(this.#data[this.#currentPage - 1]);
        }
        var response = this.#data[this.#currentPage - 1];
        return response;
    }

    getCurrentPage() {
        return this.#currentPage;
    }

    getLengthPage() {
        return this.#data.length;
    }

    setData(array = []) {
        this.#data = [];

        var start = 0;
        var indexstart = 0;
        var tamp = [];

        for (var i = 0; i < array.length; i++) {
            tamp[indexstart] = array[i];
            indexstart++;
            if ((i + 1) % this.#perpage == 0) {
                this.#data[start] = tamp;
                tamp = [];
                start++;
                indexstart = 0;
            }
        }

        if (tamp.length > 0) {
            this.#data[start] = tamp;
        }
    }

    //set currentPage = 1
    setPerPage(perpage) {
        this.#perpage = perpage;

        var array = [];
        for (var i = 0; i < this.#data.length; i++) {
            array = array.concat(this.#data[i]);
        }

        this.#data = [];
        this.#currentPage = 1;

        var start = 0;
        var indexstart = 0;
        var tamp = [];

        for (var i = 0; i < array.length; i++) {
            tamp[indexstart] = array[i];
            indexstart++;
            if ((i + 1) % this.#perpage == 0) {
                this.#data[start] = tamp;
                tamp = [];
                start++;
                indexstart = 0;
            }
        }

        if (tamp.length > 0) {
            this.#data[start] = tamp;
        }
    }

    getPagingInfo(){
        var total_data = this.#data.length;
        total_data = (total_data-1) * this.#perpage + this.#data[total_data-1].length;
        var response = {
            total_data: total_data,
            length_page: this.#data.length,
            page: this.#currentPage,
            data_page: this.#data[this.#currentPage - 1],
            start_data: (this.#currentPage-1) * this.#perpage + 1,
            end_data: (this.#currentPage-1) * this.#perpage + this.#data[this.#currentPage-1].length
        }
        return response;
    }
    //default data page-1
    onChange(callback = null) {
        setInterval(() => {
            if (JSON.stringify(this.#data) != JSON.stringify(this.#oldData)) {
                this.#currentPage = 1;
                this.#oldData = this.#data;
                callback(this.#data[this.#currentPage - 1]);
            }
        }, 1000);
    }
}

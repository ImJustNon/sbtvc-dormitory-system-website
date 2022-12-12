module.exports = {
    split_post_data: (p, data) =>{
        let page = parseInt(p) - 1;
        if (parseInt(p) > 1) {
            page = (parseInt(p) - 1) * 5;
        }

        if (data.length <= 5 && p == "1") {
            return data;
        }
        else if (data.length > 5) {
            let data_in_page = data.slice(parseInt(page), parseInt(page) + 5);
            return data_in_page;
        }
        else {
            return [];
        }
    },
}
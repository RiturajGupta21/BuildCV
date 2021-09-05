const preFetch = {
    store: [],
    request: function() {
        return m.request("data.json").then(userData => {
            return (preFetch.store = userData.details);
        });
    }
};

const App = {
    oninit: preFetch.request,
    view: function(vNode) {
        if (preFetch.store.length !== 0) {
            return [m(header, preFetch.store.header), m(body, preFetch.store.body)];
        }
    }
};

const header = {
    view: function(passedData) {
        return m("header", [
            m("h1", passedData.attrs.name),
            m("section", [
                m("aside", [
                    m.trust(
                        `<img src="${
              passedData.attrs.photo
            }" alt="Rituraj Gupta" width="130" height="140"></img><br>Languages Known : <b>${
              passedData.attrs.language
            }</b><br/><b>${passedData.attrs.print.join(", ")}</b>`
                    )
                ]),
                m("", `${passedData.attrs.city}, ${passedData.attrs.state}`),
                m.trust(`Mobile : <b>${passedData.attrs.mobile}</b><br/>
                Email : <a href="mailto:${passedData.attrs.email}" target="_blank" title="Contact Email">${passedData.attrs.email}</a><br />
                Website : <a href="${passedData.attrs.website}" target="_blank" title="Personal Website">${passedData.attrs.website}</a><br />`)
            ])
        ]);
    }
};

const body = {
    view: function(passedData) {
        return m(
            "article",
            Object.keys(passedData.attrs).map(section => {
                return [
                    m("section", [
                        m("h3", section),
                        m("hr"),
                        m(
                            "",
                            passedData.attrs[section].map(item => {
                                return [
                                    m("h4", item.title),
                                    m("h5", item.subtitle),
                                    m.trust(`<p>${item.description}</p>`)
                                ];
                            })
                        )
                    ]),
                    m("br", { class: "pagebreak" })
                ];
            })
        );
    }
};

m.mount(document.body, App);
const template = document.createElement("template");

template.innerHTML = `
    <style>${stylesheet()}</style>
    <main>
        <header style="display:none"></header>
        <footer style="display:none"></footer>
    </main>`;

export default template;

function stylesheet() {
    return `
:host {}

main { display:block; }

footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
}

ul {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
    margin: 0 0 26px 0;
}

li {
    flex: auto;
    display: block;
    height: 40px;
    margin: 0 1px;
}

li:nth-child(30n) {
    margin-right: 3%;
}

li:last-child {
    margin-right: 0px;
}

.state-up {
    background: #1cd41c;
}
.state-trouble {
    background: orange;
}
.state-down {
    background: red;
}


.legend-items {
    display: flex;
}

.legend-key {
    display: flex;
    align-items: center;
    margin-right: 16px;
}

.legend-key i {
    width: 26px;
    height: 26px;
    display: block;
    margin-right: 8px;
    border-radius: 26px;

}
`;
}


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
    position: relative;
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

li:before {
    display: none;
    font-size: 14px;
    position: absolute;
    content: attr(data-label);
    background: white;
    color: black;
    padding: 5px;
    border-radius: 4px;
    bottom: 120%;
    border: 1px solid black;
    box-shadow: 0 3px 5px #00000055;
    max-width: 120px;
}

li:hover:before {
    display:block;
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


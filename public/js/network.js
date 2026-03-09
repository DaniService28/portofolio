let socket = null;

const actionSchemas = {
    "uppercase": [
        { key: "value", label: "Text", type: "text" }
    ],
    "reverse_string": [
        { key: "text", label: "Text", type: "text" }
    ],
    "echo": [
        { key: "msg", label: "Message", type: "text" }
    ],
    "math": [
        { key: "op", label: "Operation (add, subtract, multiply, divide)", type: "text" },
        { key: "a", label: "A", type: "number" },
        { key: "b", label: "B", type: "number" }
    ],
    "read_file": [
        { key: "filename", label: "Filename", type: "text" }
    ],
    "random_number": [
        { key: "min", label: "Min", type: "number" },
        { key: "max", label: "Max", type: "number" }
    ],
    "get_info": [],
    "get_time": []
};

function connectToBridge() {
    socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
        console.log("[PORTFOLIO] Connected to WebSocket bridge");
    };

    socket.onmessage = (event) => {
        console.log("[PORTFOLIO] Received:", event.data);

        // Aquí puedes actualizar la UI
        handleServerMessage(event.data);
    };

    socket.onclose = () => {
        console.log("[PORTFOLIO] WebSocket closed");
    };
}

function sendRequest(action, payload = {}) {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
        console.error("WebSocket not connected");
        return;
    }

    const msg = JSON.stringify({ action, payload });
    console.log("[PORTFOLIO] Sending:", msg);
    socket.send(msg);

    console.log("sendRequest ejecutado:", action, payload);
}

// Esta función la puedes personalizar para actualizar tu UI
function handleServerMessage(raw) {
    const data = JSON.parse(raw);

    console.log("Procesado:", data);

    const output = document.getElementById("server-response");
    if (output) {
        output.textContent = JSON.stringify(data, null, 2);
    }
}


function sendNetworkRequest() {
    const action = document.getElementById("action").value;
    const schema = actionSchemas[action] || [];

    const payload = {};

    schema.forEach(field => {
        const value = document.getElementById(`field-${field.key}`).value;
        payload[field.key] = value;
    });

    sendRequest(action, payload);
}

/*Renderizar inputs según la acción */
function renderFieldsForAction(action) {
    const container = document.getElementById("dynamic-fields");
    container.innerHTML = "";

    const schema = actionSchemas[action] || [];

    schema.forEach(field => {
        const wrapper = document.createElement("div");
        wrapper.className = "field-group";

        wrapper.innerHTML = `
            <label>${field.label}</label>
            <input type="${field.type}" id="field-${field.key}">
        `;

        container.appendChild(wrapper);
    });
}

function handleServerMessage(raw) {
    const data = JSON.parse(raw);
    document.getElementById("network-response").textContent =
        JSON.stringify(data, null, 2);
}


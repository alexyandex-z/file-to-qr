/* Quiet is a library for sending and receiving data via sound
    This scrit defines how the data will be sent via sound waves
*/
var path = window.location.pathname;
var currentPageName = path.split("/").pop();
var profilesPrefix = window.location.pathname.replace(currentPageName, "")
profilesPrefix += "utils/quiet/";

console.log(profilesPrefix);
Quiet.init({
    profilesPrefix: profilesPrefix,
    memoryInitializerPrefix: profilesPrefix,
    libfecPrefix: profilesPrefix
});

var target;
var content = new ArrayBuffer(0);
var warningbox;

function onReceive(recvPayload) {
    // content = Quiet.mergeab(content, recvPayload);
    // var contentAsText = Quiet.ab2str(content);

    var payloadAsText = Quiet.ab2str(recvPayload);
    target.textContent = payloadAsText;

    if (payloadAsText) {
        console.log("payloadAsText", payloadAsText);
        var event = new Event(payloadAsText);
        document.dispatchEvent(event)
    }

    warningbox.classList.add("hidden");
};

function onReceiverCreateFail(reason) {
    console.log("failed to create quiet receiver: " + reason);
    warningbox.classList.remove("hidden");
    warningbox.textContent = "Sorry, it looks like this example is not supported by your browser. Please give permission to use the microphone or try again in Google Chrome or Microsoft Edge."
};

function onReceiveFail(num_fails) {
    warningbox.classList.remove("hidden");
    warningbox.textContent = "We didn't quite get that. It looks like you tried to transmit something. You may need to move the transmitter closer to the receiver and set the volume to 50%."
};

function onQuietReady() {
    var profilename = document.querySelector('[data-quiet-profile-name]').getAttribute('data-quiet-profile-name');
    Quiet.receiver({
        profile: profilename,
        onReceive: onReceive,
        onCreateFail: onReceiverCreateFail,
        onReceiveFail: onReceiveFail
    });
};

function onQuietFail(reason) {
    console.log("quiet failed to initialize: " + reason);
    warningbox.classList.remove("hidden");
    warningbox.textContent = "Sorry, it looks like there was a problem with this example (" + reason + ")";
};

function startListening() {
    target = document.querySelector('[data-quiet-receive-text-target]');
    warningbox = document.querySelector('[data-quiet-warning]');
    Quiet.addReadyCallback(onQuietReady, onQuietFail);
};

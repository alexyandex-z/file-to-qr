/* Quiet is a library for sending and receiving data via sound
    This scrit defines how the data will be received via sound waves
*/
var path = window.location.pathname;
var currentPageName = path.split("/").pop();
var profilesPrefix = window.location.pathname.replace(currentPageName, "")
profilesPrefix += "utils/quiet/";

Quiet.init({
    profilesPrefix: profilesPrefix,
    memoryInitializerPrefix: profilesPrefix,
    libfecPrefix: profilesPrefix
});
var transmit;

function onTransmitFinish() {

};

function onQuietReady() {
    transmit = Quiet.transmitter({ profile: "audible", onFinish: onTransmitFinish });
};

function onQuietFail(reason) {
    console.log("quiet failed to initialize: " + reason);
    warningbox.classList.remove("hidden");
    warningbox.textContent = "Sorry, it looks like there was a problem with this example (" + reason + ")";
};

Quiet.addReadyCallback(onQuietReady, onQuietFail);


async function playAcceptSequence() {
    transmit.transmit(Quiet.str2ab("ACCEPTED"));
}

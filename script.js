"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.getElementById("resumeForm");
const resumePage = document.getElementById("resumePage");
const resumePhoto = document.getElementById("resumePhoto");
const resumeName = document.getElementById("resumeName");
const resumeEmail = document.getElementById("resumeEmail");
const resumePhone = document.getElementById("resumePhone");
const resumeEducation = document.getElementById("resumeEducation");
const resumeWorkExperience = document.getElementById("resumeWorkExperience");
const resumeSkills = document.getElementById("resumeSkills");
const resumefacebook = document.getElementById("resumefacebook");
const resumeinstagram = document.getElementById("resumeinstagram");
const resumelinkdin = document.getElementById("resumelinkdin");
const downloadPdfButton = document.getElementById("download-pdf");
const backButton = document.getElementById("backButton");
const editButton = document.getElementById("editButton");
const resumeContent = document.getElementById("resumeContent");
const shareLinkButton = document.getElementById("shareLinkButton");
form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const degree = document.getElementById("degree").value;
    const education = document.getElementById("education")
        .value;
    const workExperience = document.getElementById("workExperience").value;
    const skills = document.getElementById("skills")
        .value;
    const facebooklinks = document.getElementById("facebooklinks").value;
    const instagramlinks = document.getElementById("instagramlinks").value;
    const linkdinlinks = document.getElementById("linkdinlinks").value;
    const photoInput = document.getElementById("photo");
    const photoFile = photoInput.files ? photoInput.files[0] : null;
    let photoBase64 = "";
    if (photoFile) {
        photoBase64 = yield fileToBase64(photoFile);
        localStorage.setItem("resumePhoto", photoBase64);
        resumePhoto.src = photoBase64;
    }
    if (photoFile && !photoFile.type.startsWith("image/")) {
        alert("Please upload a valid image file.");
        return;
    }
    resumeName.textContent = name;
    resumeEmail.textContent = `Email: ${email}`;
    resumePhone.textContent = `Phone: ${phone}`;
    resumeEducation.textContent = `${degree} from ${education}`;
    resumeWorkExperience.textContent = workExperience;
    resumeSkills.textContent = skills;
    resumefacebook.textContent = facebooklinks;
    resumeinstagram.textContent = instagramlinks;
    resumelinkdin.textContent = linkdinlinks;
    (_a = document.querySelector(".container")) === null || _a === void 0 ? void 0 : _a.classList.add("hidden");
    resumePage.classList.remove("hidden");
    const queryParams = new URLSearchParams({
        name: name,
        email: email,
        phone: phone,
        degree: degree,
        education: education,
        workExperience: workExperience,
        skills: skills,
        facebook: facebooklinks,
        instagram: instagramlinks,
        linkdin: linkdinlinks,
    });
    const uniqueUrl = `${window.location.origin}? ${queryParams.toString()}`;
    shareLinkButton.addEventListener("click", () => {
        navigator.clipboard.writeText(uniqueUrl);
        alert("Copied to clipboard!");
    });
    window.history.replaceState(null, "", `?${queryParams.toString()}`);
}));
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
// backButton.addEventListener("click", () => {
//   document.querySelector(".container")?.classList.remove("hidden");
//   resumePage.classList.add("hidden");
//   window.history.replaceState(null, "", "/");
// });
editButton.addEventListener("click", () => {
    var _a;
    updateFormFromResume();
    (_a = document.querySelector(".container")) === null || _a === void 0 ? void 0 : _a.classList.remove("hidden");
    resumePage.classList.add("hidden");
});
function updateFormFromResume() {
    var _a, _b, _c;
    const [degree, education] = ((_a = resumeEducation.textContent) === null || _a === void 0 ? void 0 : _a.split(" from ")) || [];
    document.getElementById("name").value =
        resumeName.textContent || "";
    document.getElementById("email").value =
        ((_b = resumeEmail.textContent) === null || _b === void 0 ? void 0 : _b.replace("Email: ", "")) || "";
    document.getElementById("phone").value =
        ((_c = resumePhone.textContent) === null || _c === void 0 ? void 0 : _c.replace("Phone: ", "")) || "";
    document.getElementById("degree").value = degree || "";
    document.getElementById("education").value =
        education || "";
    document.getElementById("workExperience").value =
        resumeWorkExperience.textContent || "";
    document.getElementById("skills").value =
        resumeSkills.textContent || "";
    document.getElementById("facebooklinks").value =
        resumefacebook.textContent || "";
    document.getElementById("instagramlinks").value =
        resumeinstagram.textContent || "";
    document.getElementById("linkdinlinks").value =
        resumelinkdin.textContent || "";
}
// downloadPdfButton.addEventListener("click", () => {
//   if (typeof html2pdf === "undefined") {
//     alert("Error: html2pdf library is not loaded.");
//     return;
//   }
//   const resumeOptions = {
//     margin: 0.5,
//     filename: "resume.pdf",
//     image: { type: "jpeg", quality: 1.0 },
//     html2canvas: { scale: 2 },
//     jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
//   };
//   html2pdf()
//     .from(resumeContent)
//     .set(resumeOptions)
//     .save()
//     .catch((error: Error) => {
//       console.error("PDF generation error:", error);
//     });
// });
// window.addEventListener("DOMContentLoaded", () => {
//   const params = new URLSearchParams(window.location.search);
//   const name = params.get("name") || "";
//   const email = params.get("email") || "";
//   const phone = params.get("phone") || "";
//   const degree = params.get("degree") || "";
//   const education = params.get("education") || "";
//   const workExperience = params.get("workExperience") || "";
//   const skills = params.get("skills") || "";
//   const facebook = params.get("facebook") || "";
//   const instagram = params.get("instagram") || "";
//   const linkdin = params.get("linkdin") || "";
//   if (
//     name ||
//     email ||
//     phone ||
//     degree ||
//     education ||
//     workExperience ||
//     skills ||
//     facebook ||
//     instagram ||
//     linkdin
//   ) {
//     resumeName.textContent = name;
//     resumeEmail.textContent = `Email: ${email}`;
//     resumePhone.textContent = `Phone: ${phone}`;
//     resumeEducation.textContent = `${degree} from ${education}`;
//     resumeWorkExperience.textContent = workExperience;
//     resumeSkills.textContent = skills;
//     resumefacebook.textContent = facebook;
//     resumeinstagram.textContent = instagram;
//     resumelinkdin.textContent = linkdin;
//     const savedPhoto = localStorage.getItem("resumePhoto");
//     if (savedPhoto) {
//       resumePhoto.src = savedPhoto;
//     }
//     document.querySelector(".container")?.classList.add("hidden");
//     resumePage.classList.remove("hidden");
//   }
// });

![CI logo](https://codeinstitute.s3.amazonaws.com/fullstack/ci_logo_small.png)
---

# Pokégotchi

![Mockups of Home Page on various screen sizes](image link)



View live website [here](https://anerkiki.github.io/pokegotchi-using-pokeapi/) (Hosted on GitHub pages)

---

# Table of Contents

---

- [Design and Planning](#design-and-planning)
  - [Objectives](#objectives)
  - [Design and Brand Identity](#design-and-brand-identity)
  - [User Experience/User Interface (UX/UI)](#user-experienceuser-interfaceuxui)
    - [Typical Customer Profile](#typical-customer-profile)
    - [User Stories](#user-stories)
  - [Wireframes](#wireframes)
  - [Typography/Fonts](#typographyfonts)
  - [Colour Scheme/Design](#colour-schemedesign)
    - [Colour Palette](#colour-palette)
    - [Font Colouring](#font-colouring)
    - [Favicon](#favicon)

- [Features](#features)
  - [Key Features](#key-features)
  - [Site Wide Features](#site-wide-features)
    - [Navbar](#navbar)
    - [Footer](#footer)
    - [No Break Spaces](#no-break-spaces)
  - [Pages](#pages)

- [Testing](#testing)
  - [W3C Markup/HTML Validation Service](#w3c-markuphtml-validation-service)
  - [W3C CSS Validation Service](#w3c-css-validation-service)
  - [Lighthouse Performance](#lighthouse-performance)
  - [Accessible Web Test](#accessible-web-test)
  - [WAVE Test](#wave-test)
  - [WebAIM Contrast Checker Test](#webaim-contrast-checker-test)
  - [Manual Testing](#manual-testing)

- [Fixed Issues](#fixed-issues)

- [Deployment](#deployment)

- [Credits](#credits)
  - [Technologies Used](#technologies-used)
  - [Images Used](#images-used)
  - [Acknowledgements](#acknowledgements)

- [Other](#other)
  - [Future Enhancements](#future-enhancements)

---

# Design and Planning

I decided to make a game that I would enjoy playing myself, and have always loved the idea of collecting pets, which has fed into my love of pokemon, as that is the general idea of their game. I also like the idea of tamagotchi (despite never owning one) - which is a virtual pet that you can interact with, which was a craze when I was younger, and thought it would be a good idea to merge the two to make Pokégotchi!

I already knew of a free to use pokemon api called [PokeAPI](https://pokeapi.co/), which includes every pokemon species, type, pokedex number and even image sprites, so thought this would be the perfect API to use and incorporate into my project, as I can pull individual data linked to each pokemon from there to use

---

## Objectives

<!-- The main objectives of the Pokégotchi website are:

- **Point 1:** Explanation.
- **Point 2:** Explanation.

These objectives should guide the design, content, and functionality of the website to deliver an enjoyable and fun user experience. -->

---

## Design and Brand Identity

<!-- The website is designed to ... -->

---

## User Experience/User Interface(UX/UI)

### Typical Customer Profile

A typical customer for the Pokégotchi is:

- Point 1
- Point 2

### User Stories

- **As a ...:**
  - I want to ...

- **As a ...:**
  - I want to ...

---

## Wireframes

### Home Page
<!-- <details>
<summary>Click for wireframe images of Home Page</summary>

| Home Page on larger screens (laptops & larger): | Home Page on smaller screens (mobile & tablet): |
| :---: | :---: |
| ![Home Page Wireframe - large screens](assets/images/...) | ![Home Page Wireframe - small screens](assets/images/readme/...) |
</details> -->

<!-- **Changes I made to this page** -->

...

### Shelter Page
<!-- <details>
<summary>Click for wireframe images of Shelter Page</summary>

| Shelter Page on large screens (laptop & larger): | Shelter Page on smaller screens (mobile & tablet): |
| :---: | :---: |
| ![Shelter Page Wireframe - large screens](assets/images/readme/...) | ![Shelter Page Wireframe - small screens](assets/images/readme/...) |
</details> -->

<!-- **Changes I made to this page** -->

<!-- ### Explore/Walk Page (?)  ------- DO I ADD THIS?

<details>
<summary>Click for wireframe images of Explore/Walk Page</summary>

| ... Page on large screens (laptop & larger): | ... Page on smaller screens (mobile & tablet): |
| :---: | :---: |
| ![... Page Wireframe - large screens](assets/images/readme/...) | ![... Page Wireframe - small screens](assets/images/readme/...) |
</details> -->

<!-- ### 404 Page

<details>
<summary>Click for wireframe images of 404 Page</summary>

| 404 Page on large screens (laptop & larger): | 404 Page on smaller screens (mobile & tablet): |
| :---: | :---: |
| ![404 Page Wireframe - large screens](assets/images/readme/wireframes/...) | ![404 Page Wireframe - small screens](assets/images/readme/wireframes/...) |
</details> -->

---

## Typography/Fonts

<!-- I wanted to pick a ... feel for my headings, so I used **Google Fonts** to explore options. Using their preview tool, I tested the phrase "Pokégotchi Shelter" - the main site title, with the 2nd page title - to ensure it looked just right, especially the (é) character, which appeared odd in some fonts. I ultimately chose **FONT** because it perfectly captures the ... I wanted.

For paragraph text, I wanted a simple, clear, and unfussy font that would complement 'MAIN FONT' without competing for attention. Again using **Google Fonts**, I browsed sans-serif options and selected **FONT** for its ... design and easy readability.

| Header Font | Paragraph Font |
| :---: | :---: |
| ![... Font](assets/images/readme/...) | ![... Font](assets/images/readme/design/...) | -->

---

## Colour Scheme/Design

bootstrap's preset colour (from navbar) which I liked and encorporated into my palette

I used Colorzilla to find the rgb code and then translated that to rgba and tested which opacities looked good
After I found the right one, I used colourzilla again to add that colour to my palette to use for buttons etc

**Images and Colours**

<!-- I wanted the website's colour scheme to 

To be able to use each of these specific colours from ... throughout the website, I used [ColorZilla](https://www.colorzilla.com/), which is a Chrome extension that allows you to select specific colours from a webpage using a dropper tool, to get the specific hex code/rgb code directly from any online image. I added many different colours, then refined my choices by previewing them on the site to ensure they complemented each other and provided good contrast.

![link](assets/images/...) -->

**Favicon**

<!-- The favicon for this site is ... -->

### Colour Palette

<!-- ![Colour Palette](assets/images/readme/...)

For future maintainability, I defined each colour as a CSS variable (e.g., `var(--colour-name)`). This approach made it easy to update the palette later if needed - changing a single variable would update the colour everywhere it was used. -->

<!-- TO INCLUDE: last colour in palette is black - make sure to include -->

### Font Colouring

<!-- ...

I tested the colours using [WebAIM Contrast Checker Test](https://webaim.org/resources/contrastchecker)

(#webaim-contrast-checker-test) in the [Testing](#testing) section. -->

---

# Features

---

## Key Features

### Accessible for screen readers/visually impaired

I added aria-labels to all links on the website and ensured that even sections without a header had a hidden visibility header which made it clear what the section was for.

### Fully Responsive at any screen size:
<!-- Ensures the website is accessible and visually appealing on all devices, including mobile, tablet, and desktop.

This includes:
- Pokémon 'cards/boxes' that change order and location transitioning from different screen sizes.

**Examples of how boxes change depending on screen size**:

|  |  |
| :---: | :---: |
| Small screen sizes (tablet & mobile) | Medium screen sizes (small laptop) |
| ![Responsive Images on Small Screens](assets/images/readme/...) | ![Responsive Images on Medium Screens](assets/images/readme/...) |
| Large screen sizes (laptop) | XL screen sizes (monitor/TV) |
| ![Responsive Images on Medium Screens](assets/images/readme/...) | ![Responsive Images on Medium Screens](assets/images/readme/...) |

The paragraphs inside the text box and images are all inside a Bootstrap flexbox, which adjusts to the screen size. If gaps are needed, they are evenly distributed, so there are never any large unsightly gaps, no matter the viewing dimensions." -->

---

## Site Wide Features

### Navbar:

 <!-- This is shown as a banner along the top, below the page name. It has links to 1 other pages (with exception to the 404 page (?)). I decided not to fix it in place, as it isn't necessary and only links to one other page. -->

<!-- DECIDE IF I SHOULD FIX / MAKE STICKY -->

<!-- **Larger Screen (Full Sized) Navbar:**

![Full Sized Navbar with inventory items displayed inside](assets/images/readme/...)

**Smaller Screen (Collapsed) Navbar: with open Dropdown Menu:**

![Collapsed Navbar with 'View Inventory' dropdown button on page below](assets/images/readme/...) -->

### Footer:
<!-- | Larger Screen Footer: | Smaller Screen Footer: |
| :---: | :---: |
| ![Full Sized Footer](assets/images/readme/...) | ![Collapsed Footer](assets/images/readme/features/...) | -->

### No Break Spaces

<!-- I added no break spaces (`&nbsp;`) to the end of all paragraphs between the last 2 (sometimes 3 if short) words so there aren't ever any 'orphan' words, no matter the screen size - which makes blocks of text look a lot better always.

![No Break Spaces in HTML code](assets/images/readme/features/nbsp-in-html.png)

|  |  |
| :---: | :---: |
| Before | After |
| ![Before adding No Break Spaces](assets/images/readme/...) | ![After adding No Break Spaces](assets/images/readme/...) | -->

### Universal Spacing

<!-- Instead of adding margins/padding/gaps to individual elements using Bootstrap classes, like I was doing at the start, I decided to instead add these to my custom `style.css` stylesheet, so that these would be automatically passed down or I could add multiple changes with a simple custom class instead.

Instead of having lots of different classes that applied specific spacing, that were the same on multiple elements, I decided to add spacing like this to a new CSS class or onto as an element rule in my stylesheet.

The spacing was particularly helpful to space the content and add padding inside and in between the multiple text bubbles, to ensure nothing got too cramped and make sure everything stays consistent, no matter the screen size. -->

---

## Pages

<!-- **Home Page** - Description.

Featuring:
- One.
- Two **Features**
- Three.

![Mockups of Home Page on various screen sizes](assets/images/readme/...)

- A **...** Section

- All pages are also responsive so that the center content won't stretch too large on XXL Screens.

![The Home Page on XXL Screens](assets/images/readme/...)

---

**Shelter Page** - Lists a randomised group of Pokémon to adopt.

Featuring:
- One.
- Two.

![Mockups of Shelter Page on various screen sizes](assets/images/...)

---

**404 Page** - A custom error page with links to help users return to the main sections of the site.

Featuring:
- ...
- ...

![Mockups of 404 Page on various screen sizes](assets/images/...) -->

---

# Testing

---

## W3C Markup/HTML Validation Service

<!-- These are the test results from my W3C HTML Validator Tests:

| Home Page | Shelter Page |
| :---: | :---: |
| ![HTML Validation Pass - Home](assets/images/readme/...) | ![HTML Validation Pass - Shelter](assets/images/readme/...) |

| Home Page | Shelter Page | 404 Page |
| :---: | :---: | :---: |
| ![HTML Validation Pass - Home](assets/images/readme/...) | ![HTML Validation Pass - Shelter](assets/images/readme/testing/...) | ![HTML Validation Pass - 404](assets/images/readme/...) | -->

---

## W3C CSS Validation Service

<!-- The CSS stylesheet passes the CSS Validation Service.

![CSS Validation Pass](assets/images/readme/testing/w3c/css-pass.png)

There were some warnings which are due to using CSS variables and imported stylesheets from Bootstrap, which aren't anything to worry about.

<details>
<summary>*click to see warning messages*</summary>

![CSS Warnings](assets/images/readme/testing/...)
</details> -->

---

## Lighthouse Performance

<!-- These are the lighthouse scores below for each of the pages:

Home Page:

![Home Page Lighthouse](assets/images/readme/testing/...)

Shelter Page:

![Shelter Page Lighthouse](assets/images/readme/testing/...)

404 Page:

![404 Page Lighthouse](assets/images/readme/testing/...) -->

---

## Accessible Web Test
<!-- DO I WANT THIS?? -->

<!-- https://accessibleweb.com/website-accessibility-checker/

![Accessible Web Test Result showing no errors](assets/images/readme/testing/...) -->

---

## WAVE Test

<!-- These were my test results:

### Home Page

There were **no Errors** or **Contrast Errors** in the Home Page.

|  |  |
| :---: | :---: |
| ![Home Page Summary](assets/images/readme/testing/...) | ![Home Page Details](assets/images/readme/testing/...) |

The Alerts above are due to ...

![Alerts from Home Page Wave Tests](assets/images/readme/testing/...)

### Shelter Page

There were **no Errors** or **Contrast Errors** in the Shelter Page.

|  |  |
| :---: | :---: |
| ![Shelter Page Summary](assets/images/readme/testing/...) | ![Shelter Page Details](assets/images/readme/testing/...) |

### 404 Page

There were **no Errors**, **Contrast Errors** or **Alerts** in the 404 Page.

![404 Page Summary](assets/images/readme/testing/...) -->

---

## WebAIM Contrast Checker Test

<!-- ... -->

---

## Manual Testing

<!-- | Test Area | What I'm Testing | Did it Pass? |
| --- | --- |:---:|
| Navigation Links | Do all links navigate to the correct page/section? | Yes |
| Navigation Links | Do all buttons lead to the intended destination? | Yes |
| Forms | Does all the validation work, so the form can't be submitted without all required fields filled and with valid/the correct characters? | Yes |
| Forms | Once submitted does it navigate to the correct page/stay on the right page? | Yes |
| Responsive Design | Does the website adapt as intended at all screen sizes? | Yes |
| Responsive Design | Does the burger menu work as it should, including closing when a link has been clicked? | Yes | -->

---

# Fixed Issues

Added text-wrap as a class to the interact with pokemon dropdown menu as by having the button as a dropdown toggle on bootstrap, that adds nowrap for some reason when that class is used

---

### Fixed Issue

<details>
<summary>Issue & Solution:</summary>

**Issue:** Issue.

**Solution:** Solution.

</details>

---

### Fixed Issue

<details>
<summary>Issue & Solution:</summary>

**Issue:** Issue.

**Solution:** Solution.

</details>

---

# Deployment

<!-- The following steps outline how I created my project and cloned it locally from GitHub. You can use equivalent tools, apps, or platforms based on your own device or preferences.

**GitHub**

- Firstly, I made a new repository in GitHub from the code institute template, with my chosen name for my project, which is `pokegotchi-using-pokeapi`
    - I ensured that this was in *snake case*.

- I then copied the GitHub repository URL from the top of the page, as shown below.

![Copying URL from GitHub repository](assets/images/readme/deployment/copying-url.png)

**File Explorer**

- Once I had made a new repository, in 'File Explorer' on my local Windows device, I then navigated to the folder I wanted my project to be in, and right clicked to 'Open in Terminal'.

![Right clicking in chosen folder to open in Terminal](assets/images/readme/deployment/opening-terminal.png)

**Terminal**

- Then, after making sure I was still in the correct folder, I typed `git clone [link copied and pasted from GitHub address bar]` into the Terminal.

![Cloning repository in the Terminal](assets/images/readme/deployment/terminal-cloning.png)

- This is what it should look like if this has worked correctly.

![Finished cloning repository in the Terminal](assets/images/readme/deployment/terminal-cloning-finished.png)

- Now a new folder will have been added to your 'File Explorer' which is linked to the GitHub repository.

![Newly created project folder](assets/images/readme/deployment/new-project-folder.png)

**VS Code**

- Next, I opened the new project folder in my chosen IDE (in my case this is VS Code) and pushed to GitHub to ensure the connection had been made.

Then I set up the initial project structure:

- I created the main html page: `index.html`, and created the `assets` folder which I added a `css` folder and an `images` folder inside.

- I added a `style.css` stylesheet inside the `css` folder and linked it to my `index.html` file, testing that the link had worked.

- I integrated Bootstrap and Font Awesome by linking them into my `index.html`, and also imported my chosen Google Fonts to the `style.css` stylesheet by adding the import URL to the top.

- In my custom CSS file (`style.css`), I defined the color palette and font styles as CSS variables to ensure consistent branding and design.

------- ADD IN JAVASCRIPT LINK AND JQUERY ETC -------

- After verifying that all dependencies and styles were correctly linked, I staged, committed, and pushed these initial changes to the GitHub repository.

![Image of the commits on Git](assets/images/readme/deployment/commits.png) -->

---

# **Credits**

# Technologies Used

### [GitHub](https://github.com/)
- I used GitHub to store and manage the source code for this project and track changes.

### [VS Code](https://code.visualstudio.com/)
- I used VS Code as my IDE to code and develop this website and to push to GitHub.

### [Google Fonts](https://fonts.google.com/)
- I used this to find and create an import URL so that I could use my 2 chosen fonts ... & ....

### [Font Awesome](https://fontawesome.com/)
- I used Font Awesome to add icons to the website so that they could be coloured to match my design, specifically gender symbols in the Pokémon name Nidoran.

### [Bootstrap](https://getbootstrap.com/)
<!-- - I used Bootstrap to design my navbar, and as a flexbox/grid in my navbar, main content and forms. -->

### [Google](https://google.com/)
- I used Google to research features, troubleshoot issues, and find solutions for implementing various aspects of the website.

### [Notion](https://www.notion.com/)
- I used Notion to write up ideas, to do lists/issues that needed fixing, and paste screenshots, images and their links, etc.

### [ColorZilla (Chrome Extension)](https://www.colorzilla.com/)
<!-- - I used ColorZilla to extract precise color codes from images and web pages, allowing me to accurately match and apply colors throughout the website for a consistent design. -->

### [Balsamiq](https://balsamiq.com/)
- I used Balsamiq to make my wireframes.

### [PokéAPI](https://pokeapi.co/)
<!-- - I used data from the PokéAPI API for individual pokemon display boxes including images and .... -->

---

# Images Used

<!-- ## Site Wide

---

### [link name](image link)
- I used this website to find my favicon.

#### **Favicon**:
<details>
<summary>*click to view image*</summary>

</details>

[link name](image link)

## Pokémon Images Copyright and Credits

All Pokémon-related images used in this project are the property of their respective copyright holders. These include:

- **The Pokémon Company** for overall franchise rights.
- **The Creater of PokéAPI** ...

These images are used here for creative and educational purposes only. Full credit and copyright remain with the original creators and rights holders. -->

---

# Acknowledgements

I would like to thank the team at Code Institute, the members of the Slack community, my tutor Tom and my mentor Spencer for all of their help and support throughout this course and project.

---

# Other

## Future Enhancements

- Adding pokemon collection and inventory to local storage so that if window is closed/refreshed the collection and inventory are still the same.

---

# Delete below from README after

---

## Add to README

Consistant variable/id/class names
  - all ids and classes are all in kebab-case, with the exception of modal ids which are in camelCase

---

# To Dos

- Change name for nidoran and mr mime to remove -s and add gender icons to nidoran on wild encounter function
  - This line in wild encounter function isn't working
  - const pokemonName = capitalizeWords(data.name); // not working?

## Next:
- Remove radios now that can click on the pokemon box anywhere
- Remove the walk modal title and x on mobiles so that the full modal is visible with image and buttons are more accessible
### Then:
<!-- Specificity -->
- Maybe add in nickname (specificity) to modals for deleting and renaming pokemon

- Add specicifity to pokemon that needs healing/feeding - "Your Pokémon {nickname of one with 0 stat} needs feeding"

- Reduce line height of modal titles to same as other titles

- Add in enter and esc to work instead of okay/cancel, and maybe add in pressing the letter w will take you on a walk

## Bugs to Fix:
- Issue with multiple pokemon appearing when enter button is clicked, the surprise encounter/disturbance modal with investigate button isn't closing the modal, or will make 2 pokemon appear sometimes. Selected second one by accident and first was gone.
- Stop the images being squashed and make height match if width shrinks

- stop it logging multiple times when clicking add starter to collection if slow connection - ends up with duplicates sometimes
  - maybe add a modal that is static and remove .fade so nothing else can be clicked once open?

- Bug discovered after testing:
  - When I delete last pokemon and the form comes back up, it stays at the bottom and I have to scroll up

- When scroll bar buttons are clicked, the interact button background changes colour

- Issue with rename input box looking too wide under about 500px
  - This hasn't fixed it:

#renameModal #new-nickname {
    max-width: 80%;
}

#### Style To Dos:
- remove arrow in dropdown menu button for interacting with pokemon and replace with font awesome icon
- Change location of dropdown to be to the right of the button, instead of in line with it
- Remove the small border between sections in modals
###### Less Important/If Time
- Sometimes if I accidentally highlight the text in a modal, when that modal re-opens the text is stil highlighted - fix this so it isn't.
- When testing on my phone, Title spreads to edges of screen - add padding to sides
- Have clicking off one of the starter boxes deselect the selected starter
- Add listener to make go for walk button be clicked when w is pressed
  - But make sure it only works if walk button does not have the class hidden
- Add in 2nd type if there is one in PokéAPI & join with " & "
- Merge all modals to one?
- If there is only 1 pokemon then remove the class that shrinks it to col-6 (col-md-6?) so that it stays full screen
  - Have a max-width though so it doesn't look weird
- Change colour of progress bars
- When collect button has been clicked, there is a blue background on the button that shows up - change this to a colour from palette
- Reduce size of input box
- make interactions/stat changes slightly different for different personalities
- Add evolving - once you get pokemon leveled up enough
- Add type to wild encounter function
### Ideas
- pokemon image fades if their health is low
- if pokemon is unhappy maybe change image so pokemon is facing away
  - Could be done by adding backwards image/sideways imagen to userCollection objects
- Have chance of being able to adopt wild pokemon not at 100%
- if pokémon image is clicked on, a speech bubble will appear and give hints. or say that it’s hungry/needs healing etc if any bars are low
#### Done
- Rename errorModal to alertModal
- IMPORTANT: Add labels to radio buttons
- Change Adding... background on button from white to primary pale
- FIX: Issue with progress bars not filling full width next to image and interact button/progress bars being too long/short sometimes
- Modals & Dropdown menu:
  - Decorate the in the same style as the rest of the site and make sure fonts/buttons are large enough to read/have enough contrast
- Size of level needs amending so that it is never smaller than the type and personality
- Add onclick handler to add 'checked' to radio of starter parent element clicked
  - Maybe have selected pokemon background light up/change colour when radio is selected
- Add split border to interact button
- Change text inside add button while loading to “Adding…” or similar (and stop it adding another?)
- modals appear in different places on the screen - alerts are center, and walks are top - make all center
- in releasePokemon - clear the input box and deselect the radio button selection when last pokemon deleted and form comes back
- Removed fade from walkResultsModal, as it is a static modal so can't be missed, and then can have more immediate rewards
- Change 'pet' to 'play with' as looks nicer and is the same amount of words as other actions so looks neater
- add backwards image to walks
- Make sure add enter key to be able to adopt/interact/say okay on modals
- Add finding pokemon feature on walks for pokemon that are above a certain level and add that into walk pop up modals/footer so players know.
  - whether one shows up is linked to level of pokemon joining on the walk
    - link this in via js - if [joining pokemon level > 10] then chance to encounter pokemon
  - Put a footer in and make sure is always stuck to bottom
    - Add to footer notes/tips about how to get more pokemon
      - Tip: to have a chance to find pokemon on a walk, train with your pokemon until over level 10 and then go for a walk with them.  
- Stick footer to the bottom of the page
- Link up rename button and make functions to change name
- When starter pokemon is selected, change the colour of the background/border to something obvious
- to fix - actionTrain - if health is on 0 - there should be an error/alert modal - checkForStats() one shown not actionTrain()
- fix heights of starter boxes so that even if personalities goes over 2 lines the boxes still line up at the bottom
- When delete last pokemon, refresh the starter choices too - make delete button also click refresh personalities button
  - Did this by calling the addNewPersonalitiesToStarters function in the releasePokemon function if it is the last one in collection
- Check why button in navbar is working seamlessly to refresh pokemon yet one in main section reloads the whole page - not linked to function
  - Fix: the button didn't have type="button", so pressing the button was acting as if it was submitting the form, refreshing the whole page, adding this fixed the issue
- If health is at 0, level should not go up
**Add to readme**
- Choose a slide time and match all - 4000
  - I adjusted the times dependant on how long the text in the tip was and asked friends and family to check if it seemed long enough
- set the walk results as a static backdrop modal, and it is the only one, as I noticed the title was an id, so if I replicated this elsewhere I would have to change this, which could be a Potential future problem, So I changed the id.
---
- You should still be able to feed a berry to or pet your pokemon, even if the health is at 0, without the modal coming up.
This should only come up when trying to battle.
**Issue:** The alert from checkForLowStats is coming up (for 0 health - "your pokemon need healing with potions") -
even when just trying to pet or feed a berry to pokemon, which I don't want it doing
This may also fix the issue with the wrong modal coming up when trying to battle with 0 health
**How I fixed it:**
- displayUserCollection calls lowStats function - I changed this to get rid of the function checkForLowStats and instead included the checks and error pop ups to the trainWith function instead
##### Check is done:
- check if text-wrap: balance; negates the need for nbsp - LOOK INTO LATER */

function surpriseEncounter()
    $("#walkSurpriseModal").modal("hide"); // Check is working correctly!!!

When press enter and new nickname pops up, the investigate modal is still up sometimes.
- When pressing enter to adpot a pokemon and clicking fast, sometimes there are 2 options and even if the first is selected by clicking adopt and the second one too, only the second one logs
/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people,chars);
            break;
        case "no":
            //! TODO: Declare a searchByTrait function //////////////////////////////////////////
            searchResults = searchByTrait(people);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

function searchByTrait(people) {
    let searchResults;
    let userInput = prompt(
        "Would you like to search by Gender, DOB, Weight, Height, Eye Color, or Occupation? Or press 1 to search multiple traits"
    );
    userInput = userInput.toLowerCase();
    switch(userInput) {
        case "1":
            searchResults = searchMultiTraits(people);
            break;
        case "gender":
            searchResults = searchByGender(people);
            displayPeople(searchResults)
            break;
        case "dob": 
            searchResults = searchByDOB(people);
            break;
        case "weight":
            searchResults = searchByWeight(people);
            break;
        case "height":
            searchResults = searchByHeight(people);
            break;
        case "eye color":
            searchResults = searchByEyeColor(people);
            break;
        case "occupation":
            searchResults = searchByOccupation(people);
            break;
        default:
            alert("Invalid Input");
            chooseSearch();
            break;
    }
    return searchResults;
}


function searchByGender(people) {
    let gender = promptFor("What is the gender (male or female) of the person you're looking for?", chars).toLowerCase();
    let res = people.filter(function(el){
        if (el.gender == gender) {
            return true;
        }else{
            return false;
        }


    })
    displayTraitPeople(res);

}

function searchByDOB(people) {
    let dob = promptFor("What is the DOB of the person you're looking for?", isValid);
    let res = people.filter(function(el){
        if (el.dob == dob) {
            return true;
        }
    })
    displayTraitPeople(res)
}

function searchByWeight(people) {
    let weight = promptFor("What is the weight of the person you're looking for?", isValid);
    let res = people.filter(function(el){
        if (el.weight == weight) {
            return true;
        }
    })
    displayTraitPeople(res)
}

function searchByHeight(people) {
    let height = promptFor("What is the height of the person you're looking for?", isValid);
    let res = people.filter(function(el){
        if (el.height == height) {
            return true;
        }
    })
    displayTraitPeople(res)
}

function searchByEyeColor(people) {
    let eyeColor = promptFor("What is the eye color of the person you're looking for?", isValid).toLowerCase();
    let res = people.filter(function(el){
        if (el.eyeColor == eyeColor) {
            return true;
        }
    })
    displayTraitPeople(res)
}

function searchByOccupation(people) {
    let occupation = promptFor("What is the occupation of the person you're looking for?", isValid).toLowerCase();
    let res = people.filter(function(el){
        if (el.occupation == occupation) {
            return true;
        }
    })
    displayTraitPeople(res)
}


function searchByMultipleTraits(people) {

}



/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            //! TODO: Declare a findPersonInfo function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            break;

            case "family":
                //! TODO: Declare a findPersonFamily function //////////////////////////////////////////
                // HINT: Look for a people-collection stringifier utility function to help
                let siblings = findPersonSiblings(person[0],people)
                let showSiblings = displayPeople(siblings)
                let children = findPersonChildren(person[0],people)
                let showChildren = displayPeople(children)
                alert(`Parent(s): ${findPersonParent(person[0], people)}\nSpouse: ${findPersonSpouse(person[0], people)}\nChildren: ${showChildren}\nSiblings: ${showSiblings}`);
                break;

        case "descendants":
            //! TODO: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = findPersonDescendants(person[0], people);
            let showDescendants = displayPeople(personDescendants)
            alert(`${showDescendants}`);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
 function displayPeople(people) {
    let res = people.map(function (person) {
            return person.firstName + ' ' + person.lastName;
        })
    .join("\n");
    return res
}

function displayTraitPeople(people) {
    alert (people.map(function (person) {
            return person.firstName + ' ' + person.lastName;
        })
    .join("\n")
);
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    personInfo += `Gender: ${person.gender}\n`;
    personInfo += `DoB: ${person.dob}\n`;
    personInfo += `Height: ${person.height}\n`;
    personInfo += `Weight: ${person.weight}\n`;
    personInfo += `eyeColor: ${person.eyeColor}\n`;
    personInfo += `Occupation: ${person.occupation}\n`;
    personInfo += `Parents: ${person.parents}\n`;
    personInfo += `currentSpouse: ${person.currentSpouse}`
    //! TODO: finish getting the rest of the information to display //////////////////////////////////////////
    alert(personInfo);
}


/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
 function promptFor(question, valid) {
    let isValid;
    do {
        var response = prompt(question).trim();
        isValid = valid(response);
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()
function isValid(input) {
    return true; // Default validation only
}

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
 function yesNo(input) {
    if (input.toLowerCase() == "yes" || input.toLowerCase() == "no") {
        return true;
      } else {
            return false;
        }
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function range(start,end){
    let range = [];
    for(let i = start; i <= end; i++){
        range.push(i)
    }
    return range
}

function chars(input) {
    let isValid = true
    let az = range(65,90)
    let AZ = range(97,122)
    for(let i = 0; i < input.length; i++){
        if(az.includes(input.charCodeAt(i)) || AZ.includes(input.charCodeAt(i))){
            continue;
        }else{
            isValid = false
            break;
        }
        

    }
    return isValid
}


//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁
//find parents and spouse
function findPersonParent(person, people){
    let parent1;
    let parent2;
    if (person.parents.length === 0){
        return('No parents')
    } else if (person.parents.length === 1){
        for (let i = 0; i < people.length; i++) {
          if (person.parents[0] === people[i].id) {
            return(`${people[i].firstName} ${people[i].lastName}`);
          }

        }
    } else if (person.parents.length === 2){
      for (let i = 0; i < people.length; i++) {
        if (person.parents[0] === people[i].id){
          parent1 = people[i];
        } else if (person.parents[1] === people[i].id){
          parent2 = people[i];
        } 
       }return(`${parent1.firstName} ${parent1.lastName} and ${parent2.firstName} ${parent2.lastName}`)}
}

function findPersonSpouse(person, people){
    if (person.currentSpouse === null){
        return('No Spouse')
    } else {
        for (let i=0; i < people.length; i++) {
            if (person.currentSpouse === people[i].id){
                return(`${people[i].firstName} ${people[i].lastName}`);
            }
        }
    }
}
///

///find children
function findPersonChildren(person,people){
    let res = people.filter(function(el){
        if(el.parents.includes(person.id)){
            return true
        }else{
            return false
        }
    })
    return res
}

///Find siblings
function findPersonSiblings(person,people){
    let res = people.filter(function(el){
        if(person.parents.length != 0){
            if(el.parents.join('') === person.parents.join('') && person.id != el.id){
                return true
            }else{
                return false
            }}
        })
        return res
    }


//Recursive Descendants 
//
function findPersonDescendants(person,people,array = []){
    let subArray = findPersonChildren(person,people);
    array = [person.id]
    if(subArray.length === 0){
        return array
    }
    for(let i = 0; i < subArray.length; i++){
        array = array.concat(findPersonDescendants(subArray[i],people))
    }
    return array
}

// function findPersonChildren(person,people){
//     let res = people.filter(function(el){
//         if(el.parents.includes(person.id)){
//             return true
//         }else{
//             return false
//         }
//     })
//     return res
// }
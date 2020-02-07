// Endpoint Info for all products
const productsEndpoint = 'https://peaceful-river-39598.herokuapp.com/api/v1/mandilas/products';
// Endpoint Info for a single product
const singleProductEndpoint = 'https://peaceful-river-39598.herokuapp.com/api/v1/mandilas/product';
// Endpoint to add item to cart
const addToCartEndpoint = 'https://peaceful-river-39598.herokuapp.com/api/v1/mandilas/cart/add';
// Endpoint to get items in cart
const getItemsInCartEndpoint = 'https://peaceful-river-39598.herokuapp.com/api/v1/mandilas/cart';
// Endpoint to make payment
const initiatePaymentEndpoint = 'https://peaceful-river-39598.herokuapp.com/api/v1/mandilas/payment';
// Endpoint Info for all products
const updateCartEndpoint = 'https://peaceful-river-39598.herokuapp.com/api/v1/mandilas/cart'
const deleteCartItemEndpoint = 'https://peaceful-river-39598.herokuapp.com/api/v1/mandilas/cart'
//Check Environment
let ENV = ''
const checkEnvironment = () => {
    let origin = window.location.origin;
    if(origin === 'http://127.0.0.1:5500'){
        ENV = `development`
    }else{
        ENV = `production`
    }
    console.log(ENV);
}
checkEnvironment();

//Formatter
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits : 6,
    minimumFractionDigits : 0
})

// Handle Showing Loader
const addClass = (elem, customClass) => {
    elem.parentNode.classList.add('removePadding')
    elem.classList.add(customClass)
}
//Handle Removing Loader
const removeClass = (elem, customClass) => {
    elem.parentNode.classList.remove('removePadding')
    elem.classList.remove(customClass)
}

//Initialize Local Storage
const initializeLocalStorage = () => {
    const token = localStorage.getItem('mandilasToken');
    if(token === null){
        localStorage.setItem("mandilasToken", JSON.stringify(""))
    }
}
initializeLocalStorage();

// let CART_ITEMS = [];

//Update Cart Number
const updateCartIcon = (id) => {
    const cartNumber = document.querySelectorAll('.navbar-cart-container > .no-of-items')
    if(id !== null){
        fetch(`${getItemsInCartEndpoint}/${id}`, {
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(response => response.json())
        .then(result => {
            let {status, data, message, code} = result
            //Successful Request
            if(status === 'success'){
                // console.log(data)
                // CART_ITEMS = data.map(item => item.id)
                cartNumber.forEach(item => item.innerHTML = data.length)   
            }
            if(status === 'error'){
                cartNumber.forEach(item => item.innerHTML = 0)
                console.log(message)
            }
        }).catch(error => {
            console.log(error)
        })
    }else{
        cartNumber.forEach(item => item.innerHTML = 0)
    }
}

/**Desktop Menu */
const menuItems = document.querySelectorAll('.hometwo-menu-item.drop')
menuItems.forEach((menuItem, outerIndex, arr) => {
    menuItem.addEventListener('click', () => {
        if(window.innerWidth >= 940){
            arr.forEach((item, innerIndex) => {
                if(innerIndex !== outerIndex){
                    item.children[1].classList.add('hometwo-submenu-hide')
                }
            })
            menuItem.children[1].classList.toggle('hometwo-submenu-hide')
        }else{
            arr.forEach((item, innerIndex) => {
                if(innerIndex !== outerIndex){
                    item.children[1].classList.add('hometwo-submenu-hide')
                }
            })
            menuItem.children[1].classList.toggle('hometwo-submenu-hide')
        }
    })
})

let isUserLoggedIn = false;
let USER_ID = ''
const navbarCart = document.querySelectorAll('.navbar-cart-container');
const productList = document.querySelector('.main-ac-right-content');
const toggle = document.querySelector('.hometwo-toggle');
const menu = document.querySelector('.hometwo-menu');
const navbarButtons = document.querySelector('#hometwo-navbar-buttons');
const navFirstName = document.querySelector('#navbarFirstName')
const navLastName = document.querySelector('#navbarLastName')
const navEmail = document.querySelector('#navbarEmail')
const navPassword = document.querySelector('#navbarPassword')
const navPhoneNumber = document.querySelector('#navbarPhoneNumber')
const navRegister = document.querySelector('#registerFromRegisterModal')
const navLogIn = document.querySelector('#loginFromLoginModal');
const navLogInEmail = document.querySelector('#navLogInEmail')
const navLogInPassword = document.querySelector('#navLogInPassword')
const loginButton = document.querySelector('#login')
const registerButton = document.querySelector('#register')
const loginModal = document.querySelector('#loginModal')
const registerModal = document.querySelector('#registerModal')
const registerFromLoginModal = document.querySelector('#registerFromLoginModal');
const loginFromRegisterModal = document.querySelector('#loginFromRegisterModal'); 
const closeLogin = document.querySelector('#closeLogin');
const closeRegister = document.querySelector('#closeRegister') 
// Log Out Buttons
const navLogOut = document.querySelector('#navLogOut')
//Pre Sign In Buttons
const preSignedInButtonContainer = document.querySelector('.hometwo-buttons')
//Post Sign In Buttons
const postSignedInButtonContainer = document.querySelector('.hometwo-signedin-buttons')
//Loader
const loader = document.querySelector('#loader')
//Message Toast
const infoToast = document.querySelector('#infoToast');
const infoText = document.querySelector('#infoText');
//Client Side Validation
const signUpEndpoint = 'https://peaceful-river-39598.herokuapp.com/api/v1/mandilas/auth/sign-up'
const logInEndpoint = 'https://peaceful-river-39598.herokuapp.com/api/v1/mandilas/auth/sign-in'

//Clear Login
const clearLogin = () => {
    navLogInEmail.value = "",
    navLogInPassword.value = ""
}
const clearRegister = () => {
    navFirstName.value = "",
    navLastName.value = "",
    navEmail.value = "",
    navPhoneNumber.value = "",
    navPassword.value = ""
}

//Hamburger Menu
const hamburgerPresent = toggle.children[0].classList.contains('fa-bars')
const closeIconPresent = toggle.children[0].classList.contains('fa-close')
const handleHamburger = () => {
    if(hamburgerPresent){
        console.log("showing Menu")
        toggle.children[0].classList.toggle('fa-bars');
        toggle.children[0].classList.toggle('fa-close');
        
    }
    if(closeIconPresent){
        console.log("hiding Menu")
        toggle.children[0].classList.toggle('fa-close');
        toggle.children[0].classList.toggle('fa-bars');
    }
    navbarButtons.classList.toggle('show-item');
    menu.classList.toggle('show-item');
}
toggle.addEventListener('click', handleHamburger)
/**Desktop Menu */

/**Modal Management */

//Show Login Modal upon click
loginButton.addEventListener('click', () => {
    //Hide Menu
    handleHamburger()
    // Show Modal
    loginModal.style.display = "flex"
})
//Show Regsiter Modal upon click
registerButton.addEventListener('click', () => {
    //Hide Menu
    handleHamburger()
    // Show Modal
    registerModal.style.display = "flex"
})
//Handle Register button click in Login Modal
registerFromLoginModal.addEventListener('click', () => {
    clearLogin()
    loginModal.style.display = "none";
    registerModal.style.display = "flex"
    
})
//Handle Login button click in Register Modal
loginFromRegisterModal.addEventListener('click', () => {
    clearRegister()
    registerModal.style.display = "none"
    loginModal.style.display = "flex";
})
//Close Login Modal
closeLogin.addEventListener('click', () => {
    clearLogin()
    loginModal.style.display = 'none'
})
//Close Register Modal
closeRegister.addEventListener('click', () => {
    clearRegister();
    registerModal.style.display = 'none'
})

/**Modal Management */


/**GLOBAL VARIABLES */
/**Communication With Server */
const shakeInput = (elem) => {
    elem.classList.add('shake')
    elem.classList.add('invalid-input')
    setTimeout(() => {
        elem.classList.remove('shake')
        elem.classList.remove('invalid-input')
    }, 500);
}

const inputIsNotEmpty = (str) => {
    return (str !== "" && str !== null) ? true : false
}

const isValidText = (str) => {
    let trimStr = str.trim();
    const textRegex = RegExp("^[a-z|A-Z]*$");
    return (textRegex.test(trimStr) && trimStr !== "") ? true : false
}
const isValidEmail = (str) => {
    let trimStr = str.trim();
    const emailRegex = RegExp("^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+(?:[a-zA-Z]{2}|aero|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel)$")
    return (emailRegex.test(trimStr) && trimStr !== "") ? true : false
}
const isValidPhoneNumber = (str) => {
    let trimStr = str.trim();
    const phoneRegex = /^(0|\+234)\d{10}$/
    return (phoneRegex.test(trimStr) && trimStr !== "") ? true : false
}

//Validate Input from Sign Up Form
const validateData = (elem) => {
    if(elem.id === 'navbarFirstName' || elem.id === 'navbarLastName'){
        return (isValidText(elem.value) === true) ? true : shakeInput(elem)
    }
    if(elem.id === 'navbarEmail' || elem.id === 'navLogInEmail'){
        return (isValidEmail(elem.value) === true) ? true : shakeInput(elem)
    }
    if(elem.id === 'navbarPassword' || elem.id === 'navLogInPassword'){
        return (elem.value !== "" && elem.value.length > 6) ? true : shakeInput(elem)
    }
    if(elem.id === 'navbarPhoneNumber'){
        return (isValidPhoneNumber(elem.value) === true) ? true : shakeInput(elem)
    }
}

// Handle the Register Modal
const handleRegister = () => {
    validateData(navFirstName)
    validateData(navLastName)
    validateData(navEmail)
    validateData(navPassword)
    validateData(navPhoneNumber)
    if(validateData(navFirstName) &&
    validateData(navLastName) &&
    validateData(navEmail) &&
    validateData(navPassword) &&
    validateData(navPhoneNumber)){
        // Add Loader
        loader.classList.add('showLoader')
        //Create Request Body
        const body = {
            "firstName":navFirstName.value,
            "lastName":navLastName.value,
            "email":navEmail.value,
            "password":navPassword.value,
            "phoneNumber":navPhoneNumber.value
        }

        // Fetch options for posting JSON
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }

        //Post Data to Custom Mandilas Endpoint using browser-based FETCH
        fetch(signUpEndpoint, options)
            .then(response => {
                return response.json()
            })
            .then(data => {
                loader.classList.remove('showLoader')
                if(data.status === "success"){
                    const {name, email, token, userId} = data.data
                    //Store variables on client side
                    localStorage.setItem('mandilasToken', `${token}`)
                    infoText.innerHTML = `Hi ${body["firstName"]}, You have successfully registered`
                    postSignedInButtonContainer.children[0].innerHTML = `Hello, ${body["firstName"]}`;
                    //Remove Modal
                    registerModal.style.display = "none"
                    loginModal.style.display = "none"
                    // Show Post Register View
                    postSignedInButtonContainer.style.display = 'flex';
                    preSignedInButtonContainer.style.display = 'none';
                    //Clear Defaults
                    clearRegister();
                    // Set User State to logged in
                    isUserLoggedIn = true;
                    // Set User ID
                    USER_ID = userId
                    //Update Cart Icon
                    updateCartIcon(USER_ID)
                }
                if(data.status === "error" && data.code === "MAIL_EXISTS"){
                    infoText.innerHTML = `Hi ${body["firstName"]}, this email already exists`;
                }
                infoToast.classList.add('showInfoToast');
                    setTimeout(() => {
                        infoToast.classList.remove('showInfoToast')
                    }, 2000);
            }).catch(error => {
                console.log(error)
            })
    }
}
navRegister.addEventListener('click', handleRegister)

// Handle the Login Modal
const handleLogIn = () => {
    validateData(navLogInEmail);
    validateData(navLogInPassword);
    if(validateData(navLogInEmail) && validateData(navLogInPassword)){
        // Add Loader
        loader.classList.add('showLoader')
        //Create Request Body
        const body = {
            "email":navLogInEmail.value,
            "password":navLogInPassword.value
        }
        // Fetch options for posting JSON
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }

        fetch(logInEndpoint, options)
            .then(response => {
                return response.json()
            })
            .then(data => {
                loader.classList.remove('showLoader')
                if(data.status === 'success'){
                    const {displayName, email, customToken, userId} = data.data;
                    let firstName = `${displayName}`.split(' ')[1]
                    infoText.innerHTML = `Hi ${firstName}, You have successfully signed in.`
                    postSignedInButtonContainer.children[0].innerHTML = `Hello, ${firstName}`;
                    localStorage.setItem('mandilasToken', `${customToken}`);
                    //Remove Modal
                    loginModal.style.display = "none"
                    //Clear Defaults
                    navLogInEmail.value = "",
                    navLogInPassword.value = "",
                    // Set User State to logged in
                    isUserLoggedIn = true;
                    //Set User ID
                    USER_ID = userId
                    postSignedInButtonContainer.style.display = 'flex';
                    preSignedInButtonContainer.style.display = 'none';

                    //Update Cart Icon
                    updateCartIcon(USER_ID)
                    window.location.reload()
                }
                if(data.status === 'error' && data.code === 'INVALID PASSWORD'){
                    infoText.innerHTML = `The password you entered is incorrect.`
                }
                if(data.status === 'error' && data.code === 'INVALID EMAIL'){
                    infoText.innerHTML = `The email you entered does not exist. Try signing up.`
                    registerModal.style.display = "flex"
                }
                // Show the Toast
                infoToast.classList.add('showInfoToast');
                setTimeout(() => {
                    infoToast.classList.remove('showInfoToast')
                }, 3000);
            })
            .catch(error => {
                console.log(error)
            })
    }
}
navLogIn.addEventListener('click', handleLogIn)

/**Communication With Server */
const handleNavbarLoad = new Promise((resolve, reject) => {
    //Initialize UI
    postSignedInButtonContainer.style.display = 'none';
    preSignedInButtonContainer.style.display = 'flex';

    let clientToken = localStorage.getItem('mandilasToken');
    // If theres a token stored on the client side
    if((clientToken) && (clientToken !== 'undefined')){
        // Sign In with that token
        firebase.auth().signInWithCustomToken(clientToken)
        .then((record) => {
            //Login Successful

            USER_ID = record.user.uid
            let firstName = `${record.user.displayName}`.split(' ')[0];
            postSignedInButtonContainer.children[0].innerHTML = `Hello, ${firstName}`;
            isUserLoggedIn = true;
            // Show Post Login View
            postSignedInButtonContainer.style.display = 'flex';
            preSignedInButtonContainer.style.display = 'none';

            // Notify user of logged in status
            if(window.location.pathname === '/Homepage/index.html'){
                infoText.innerHTML = `Hi, ${firstName}, you are logged in`
                infoToast.classList.add('showInfoToast');
                setTimeout(() => {
                    infoToast.classList.remove('showInfoToast')
                }, 2000);
            }

            // Update Cart Icon
            updateCartIcon(USER_ID);
            resolve(USER_ID)

        }).catch(error => {
            // Handle Errors here.
            updateCartIcon(null);
            //Login Not Successful

            var errorCode = error.code;
            var errorMessage = error.message;
            if(errorCode === "auth/invalid-custom-token"){
                
                loader.classList.remove('showLoader')
            }
            if(errorCode === "auth/network-request-failed"){
                loader.classList.remove('showLoader')
                infoText.innerHTML = `Check your network`
                infoToast.classList.add('showInfoToast');
                setTimeout(() => {
                    infoToast.classList.remove('showInfoToast')
                }, 3000);
            }
            reject()
        });
    }
}).catch(error => {
    return error;
})
window.addEventListener('DOMContentLoaded', handleNavbarLoad)

// On User LogOut
const handleLogOut = () => {
    loader.classList.add('showLoader')
    // Sign Out on Firebase
    firebase.auth().signOut()
        .then((e) => {
            console.log('userIsSignedOut')
            // Clear Token
            localStorage.removeItem('mandilasToken')
            // Update View
            postSignedInButtonContainer.style.display = 'none';
            preSignedInButtonContainer.style.display = 'flex';
            loader.classList.remove('showLoader')
            // Update User Status
            isUserLoggedIn = false;
            USER_ID = ''
            //Reload Page
            window.location.reload()
        })
        .catch(error => {
            //Handle Errors here
        })
}
navLogOut.addEventListener('click', handleLogOut)

// User clicks on homepage logo
const navbarLogo = document.querySelector('.hometwo-logo > img')
navbarLogo.addEventListener('click', () => {
    let newPath = window.location.pathname.split("/");
    if(newPath.includes('Homepage')){
        window.location.href = "index.html"
    }else{
        window.location.href = "../Homepage/index.html"
    }
})

// User clicks on Cart
navbarCart.forEach(item => {
    const redirectToCart = () => {
        console.log(USER_ID)
        window.location.href = `../Cart/index.html`;
    }
    item.addEventListener('click', redirectToCart)
})

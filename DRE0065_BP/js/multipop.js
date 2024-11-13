let stackArray = [];
let stepCount = 0;
let potential = 0;

function updateStepCount() 
{
    const language = localStorage.getItem('language') || 'en';
    const langData = translations[language];
    document.getElementById('stepCountDisplay').innerText = `${langData.stepCount}: ${stepCount}`;
}

function updatePotential() 
{
    const language = localStorage.getItem('language') || 'en';
    const langData = translations[language];
    document.getElementById('potentialDisplay').innerText = `${langData.potential}: ${potential}`;
}

function pushToStack() 
{
    const language = localStorage.getItem('language') || 'en';
    const langData = translations[language];
    const value = prompt(langData.enterValuePrompt);
    if(value && !isNaN(value) && Number(value) > 0) 
    {
        stackArray.push(value);
        stepCount++;
        potential++;
        displayStack(stackArray);
        updateStepCount();
        updatePotential();
    } 
    else alert(langData.invalidNumberAlert);
}

function popFromStack() 
{
    const language = localStorage.getItem('language') || 'en';
    const langData = translations[language];
    if(stackArray.length > 0) 
    {
        stackArray.pop();
        stepCount++;
        potential = Math.max(0, potential - 1);
        displayStack(stackArray);
        updateStepCount();
        updatePotential();
    } 
    else alert(langData.stackEmptyAlert);
}

function multipopFromStack() 
{
    const language = localStorage.getItem('language') || 'en';
    const langData = translations[language];
    const count = parseInt(prompt(langData.multipopPrompt), 10);
    if(!isNaN(count) && count > 0) 
    {
        stackArray = stackArray.slice(0, -count);
        stepCount++;
        potential = Math.max(0, potential - count);
        displayStack(stackArray);
        updateStepCount();
        updatePotential();
    } 
    else alert(langData.invalidNumberAlert);
}

updateStepCount();
updatePotential();
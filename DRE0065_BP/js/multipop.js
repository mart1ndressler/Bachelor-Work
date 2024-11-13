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
        const stackItems = document.querySelectorAll('.stack-item');
        const newItem = stackItems[stackItems.length - 1];
        newItem.classList.add('new-item');

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
        const stackItems = document.querySelectorAll('.stack-item');
        const removedItem = stackItems[stackItems.length - 1];
        removedItem.classList.add('removed-item');

        removedItem.addEventListener('animationend', () => 
        {
            stackArray.pop();
            stepCount++;
            potential = Math.max(0, potential - 1);
            displayStack(stackArray);
            updateStepCount();
            updatePotential();
        }, {once: true});
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
        const itemsToRemove = Math.min(count, stackArray.length);
        stepCount++;
        potential = Math.max(0, potential - 1);

        for(let i = 0; i < itemsToRemove; i++) 
        {
            const stackItems = document.querySelectorAll('.stack-item');
            const item = stackItems[stackItems.length - 1 - i];
            item.classList.add('removed-item');

            item.addEventListener('animationend', () => 
            {
                stackArray.pop();
                displayStack(stackArray);
                updatePotential();
            }, { once: true });
        }                
        updateStepCount();
    } 
    else alert(langData.invalidNumberAlert);
}

updateStepCount();
updatePotential();
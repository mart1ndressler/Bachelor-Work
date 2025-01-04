function openManualParamsModal(){
    $('#manualParamsModal').modal('show');
    const language = localStorage.getItem('language') || 'en';
    const langData = translations[language];

    document.getElementById('manualParamsModalLabel').textContent = langData.manualParamsModalLabel;
    document.getElementById('stackValuesLabel').textContent = langData.stackValuesLabel;
    document.getElementById('submitBtn').textContent = langData.submitBtn;
}

function openRandomParamsModal(){
    $('#randomParamsModal').modal('show');
    const language = localStorage.getItem('language') || 'en';
    const langData = translations[language];

    document.getElementById('randomParamsModalLabel').textContent = langData.randomParamsModalLabel;
    document.getElementById('rangeMinLabel').textContent = langData.rangeMinLabel;
    document.getElementById('rangeMaxLabel').textContent = langData.rangeMaxLabel;
    document.getElementById('countLabel').textContent = langData.countLabel;
    document.getElementById('generateBtn').textContent = langData.generateBtn;
}

function submitManualParams(){
    const language = localStorage.getItem('language') || 'en';
    const langData = translations[language];
    const stackValues = document.getElementById('stackValues').value.trim();

    if(stackValues) 
    {
        const values = stackValues.split(',').map(v => v.trim()).filter(v => !isNaN(v) && Number(v) > 0);
        if(values.length > 0) 
        {
            stackArray = values;
            stepCount = 0;
            potential = stackArray.length;

            $('#manualParamsModal').modal('hide');
            displayStack(stackArray);
            document.getElementById('manualParamsForm').reset();
            
            updateStepCount();
            updatePotential();
        } 
        else alert(langData.invalidNumberAlert);
    } 
    else alert(langData.enterValuePrompt);
}

function submitRandomParams(){
    const language = localStorage.getItem('language') || 'en';
    const langData = translations[language];
    const min = parseInt(document.getElementById('rangeMin').value, 10);
    const max = parseInt(document.getElementById('rangeMax').value, 10);
    const count = parseInt(document.getElementById('count').value, 10);

    if(isNaN(min) || isNaN(max) || isNaN(count) || min >= max || count <= 0) {alert(langData.invalidNumberAlert); return;}
    stackArray = Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);
    stepCount = 0;
    potential = stackArray.length;

    $('#randomParamsModal').modal('hide');
    displayStack(stackArray);
    document.getElementById('randomParamsForm').reset();

    updateStepCount();
    updatePotential();
}

function displayStack(stackArray){
    const language = localStorage.getItem('language') || 'en';
    const langData = translations[language];

    document.getElementById('dynamicContent').innerHTML = `
    <div id="mainContainer">
        <div id="stackContainer">
            <div id="stackView" class="stack-view">
                ${stackArray.map(value => `<div class="stack-item">${value}</div>`).join('')}
            </div>
        </div>
        <div class="stack-controls">
            <div class="step-count" id="stepCountDisplay">${langData.stepCount}: ${stepCount}</div>
            <div class="potential-display" id="potentialDisplay">${langData.potential}: ${potential}</div>
            <div id="multipop_buttons">
                <button class="btn btn-primary btn-lg" onclick="pushToStack()">${langData.pushButton}</button>
                <button class="btn btn-primary btn-lg" onclick="popFromStack()">${langData.popButton}</button>
                <button class="btn btn-primary btn-lg" onclick="multipopFromStack()">${langData.multipopButton}</button>
            </div>
        </div>
    </div>
    `;
}
document.addEventListener('DOMContentLoaded', function (){
    const savedLanguage = localStorage.getItem('language') || 'en';
    changeLanguage(savedLanguage);

    var aboutBtn = document.getElementById('aboutAppBtn');
    var aboutModal = new bootstrap.Modal(document.getElementById('aboutModal'));
    aboutBtn.addEventListener('click', function () { aboutModal.show(); });
    document.getElementById('backArrow').style.display = 'none';
});

let currentPage = 'main';
function changeContent(algorithm){
    stackArray = [], steps = [], stepCount = 0, potential = 0, isBestWorstMode = false;
    currentPage = algorithm;
    document.getElementById('algorithmLinks').style.display = 'none';
    document.getElementById('backArrow').style.display = 'block';

    const contentDiv = document.getElementById('dynamicContent');
    const aboutBtn = document.getElementById('aboutAppBtn');
    const modalTitle = document.getElementById('aboutModalLabel');
    const language = localStorage.getItem('language') || 'en';
    const langData = translations[language];
    switch(algorithm) 
    {
        case 'multipop':
            contentDiv.innerHTML = `
            <div class="alg_parameters">
                <h2>${langData.multipopTitle}</h2>
                <button class="btn btn-primary" onclick="openManualParamsModal()">${langData.manualButton}</button>
                <button class="btn btn-primary" onclick="openRandomParamsModal()">${langData.randomButton}</button>
                <button class="btn btn-primary" onclick="openBestWorstParamsModal()">${langData.bestWorstButton}</button>
                <button class="btn btn-primary" onclick="openSyntaxModal()">${langData.syntaxButton}</button>
            </div>
            `;
            aboutBtn.textContent = langData.multipopAbout;
            modalTitle.innerHTML = langData.multipopAbout;
            document.getElementById('aboutModalBody').innerHTML = langData.multipopDescription;
            document.title = langData.multipopTitle;
            break;
    }
}

function goBack(){
    currentPage = 'main';
    document.getElementById('algorithmLinks').style.display = 'block';
    document.getElementById('backArrow').style.display = 'none';
    document.getElementById('dynamicContent').innerHTML = '';

    const language = localStorage.getItem('language') || 'en';
    changeLanguage(language);
}

function changeLanguage(language){
    localStorage.setItem('language', language);
    const langData = translations[language];

    document.getElementById('title_main').textContent = langData.title_main;
    document.getElementById('navBrand').textContent = langData.navBrand;
    document.getElementById('backBtn').innerHTML = langData.backBtn;
    document.getElementById('algorithm1').textContent = langData.algorithm1;
    document.getElementById('footerText').textContent = langData.footerText;
    document.getElementById('closeBtn').textContent = langData.closeBtn;

    if(currentPage === 'main') 
    {
        document.getElementById('aboutAppBtn').textContent = langData.aboutAppBtn;
        document.getElementById('aboutModalLabel').textContent = langData.aboutModalLabel;
        document.getElementById('aboutModalBody').innerHTML = `<p>${langData.aboutModalText}</p><p>${langData.aboutModalText2}</p>`;
    } 
    else if(currentPage === 'multipop') 
    {
        document.getElementById('aboutAppBtn').textContent = langData.multipopAbout;
        document.getElementById('aboutModalLabel').textContent = langData.multipopAbout;
        document.getElementById('aboutModalBody').innerHTML = langData.multipopDescription;
        document.querySelector('.alg_parameters h2').textContent = langData.multipopTitle;

        const buttons = document.querySelectorAll('.alg_parameters button');
        buttons[0].textContent = langData.manualButton;
        buttons[1].textContent = langData.randomButton;
        buttons[2].textContent = langData.bestWorstButton;
        buttons[3].textContent = langData.syntaxButton;
    }

    document.getElementById('manualParamsModalLabel').textContent = langData.manualParamsModalLabel;
    document.getElementById('stackValuesLabel').textContent = langData.stackValuesLabel;
    document.getElementById('submitBtn').textContent = langData.submitBtn;
    document.getElementById('randomParamsModalLabel').textContent = langData.randomParamsModalLabel;
    document.getElementById('rangeMinLabel').textContent = langData.rangeMinLabel;
    document.getElementById('rangeMaxLabel').textContent = langData.rangeMaxLabel;
    document.getElementById('countLabel').textContent = langData.countLabel;
    document.getElementById('generateBtn').textContent = langData.generateBtn;

    if(document.getElementById('syntaxModalLabel')) 
    {
        document.getElementById('syntaxModalLabel').textContent = langData.syntaxModalLabel;
        document.getElementById('syntaxInfo').innerHTML = langData.syntaxInfo;
        document.getElementById('syntaxInputLabel').textContent = langData.syntaxInputLabel;
        document.getElementById('syntaxInput').placeholder = langData.syntaxInputPlaceholder;
        document.getElementById('exampleInfo').textContent = langData.exampleInfo;
        document.getElementById('nextStepBtn').textContent = langData.nextButton;
        document.getElementById('startSyntaxBtn').textContent = langData.startSyntaxBtn;
    }

    const bestWorstModalLabel = document.getElementById('bestWorstModalLabel');
    const bestWorstModalText = document.getElementById('bestWorstModalText');
    const bestCaseButtonLabel = document.getElementById('bestCaseButtonLabel');
    const worstCaseButtonLabel = document.getElementById('worstCaseButtonLabel');

    if(bestWorstModalLabel && bestWorstModalText && bestCaseButtonLabel && worstCaseButtonLabel) 
    {
        bestWorstModalLabel.textContent = langData.selectCase;
        bestWorstModalText.textContent = langData.bestWorstDescription;
        bestCaseButtonLabel.textContent = langData.bestCase;
        worstCaseButtonLabel.textContent = langData.worstCase;
    }

    if(document.getElementById('endOfExample')) document.getElementById('endOfExample').textContent = langData.endOfExample;
    if(steps.length > 0) 
    {
        const oldIndex = currentCommandIndex;
        const newSteps = generateSteps(syntaxCommands);

        for(let i = 0; i < Math.min(newSteps.length, steps.length); i++)
        {
            if(steps[i].removedValue !== undefined)newSteps[i].removedValue = steps[i].removedValue;
            if(steps[i].removedValues !== undefined)newSteps[i].removedValues = steps[i].removedValues;
            if(steps[i].value !== undefined)newSteps[i].value = steps[i].value;
        }

        for(let i = 0; i < newSteps.length; i++)
        {
            if(newSteps[i].type === 'push') if(newSteps[i].value !== undefined && newSteps[i].detail) newSteps[i].detail = newSteps[i].detail.replace('{value}', newSteps[i].value);
            else if(newSteps[i].type === 'pop') if(newSteps[i].removedValue !== undefined && newSteps[i].detail)newSteps[i].detail = newSteps[i].detail.replace('{removedValue}', newSteps[i].removedValue);
            else if(newSteps[i].type === 'multipop')
            {
                if(newSteps[i].removedValues && newSteps[i].removedValues.length > 0 && newSteps[i].detail)
                {
                    const joined = newSteps[i].removedValues.join(', ');
                    newSteps[i].detail = newSteps[i].detail.replace('{removedValues}', joined);
                }
            }
        }

        steps = newSteps;
        currentCommandIndex = oldIndex;
        if(currentCommandIndex < steps.length)
        {
            const step = steps[currentCommandIndex];
            if(document.getElementById('currentStepInfo')) document.getElementById('currentStepInfo').innerHTML = `${currentCommandIndex + 1}. ${step.description}`;
            if(document.getElementById('detailedStepInfo')) document.getElementById('detailedStepInfo').innerHTML = step.detail || "Detail not provided.";
        }
    }
}

const translations = 
{
    en: 
    {
        title_main: "Main Page",
        navBrand: "Amortised Complexity",
        aboutAppBtn: "About My Bachelor Work",
        backBtn: "<i class='fas fa-arrow-left'></i> Back",
        algorithm1: "Multipop on Stack",
        aboutModalLabel: "About My Bachelor Work",
        aboutModalText: "This bachelor's work shows the amortized complexity of three selected algorithms taught in the Master of Science in Theoretical Computer Science course.",
        aboutModalText2: "For each algorithm, the user can experience the changes in complexity, for example, by specifying different values, and they can see the progression of the algorithm.",
        closeBtn: "Close",
        manualParamsModalLabel: "Set Stack Parameters",
        stackValuesLabel: "Enter stack values:",
        submitBtn: "Submit",
        randomParamsModalLabel: "Set Random Stack Parameters",
        rangeMinLabel: "Minimum value:",
        rangeMaxLabel: "Maximum value:",
        countLabel: "Number of Values:",
        generateBtn: "Generate",
        footerText: "Created By Martin Dressler, DRE0065",
        multipopTitle: "Multipop on Stack",
        multipopAbout: "About Multipop on Stack",
        multipopDescription: `
            <p><strong>Multipop on Stack</strong> is an algorithm that illustrates the concept of amortized complexity through stack operations.</p>
            <p>The stack allows two primary operations:</p>
            <ul>
              <li><strong>Push</strong> - inserting an element into the stack.</li>
              <li><strong>Pop</strong> - removing an element from the stack.</li>
            </ul>
            <p>The Multipop algorithm extends these operations to remove multiple elements at once, enhancing the stack's efficiency for certain applications.</p>
            <p>Using amortized analysis, we find that the average cost of each operation, including multipop, remains efficient, achieving an amortized complexity of <strong>O(1)</strong> per operation.</p>
        `,
        manualButton: "Manually",
        randomButton: "Randomly",
        bestWorstButton: "Best/Worst Case",
        enterValuePrompt: "Enter the positive number you want to add to the stack:",
        invalidNumberAlert: "Enter a valid positive number!",
        stackEmptyAlert: "Stack is empty!",
        multipopPrompt: "Enter the number of elements to remove:",
        stepCount: "Step Count",
        potential: "Potential",
        pushButton: "Push",
        popButton: "Pop",
        multipopButton: "Multipop",
        syntaxButton: "Syntax",
        syntaxModalLabel: "Syntax Commands",
        syntaxInfo: "Enter your syntax commands below.",
        syntaxInputLabel: "Syntax Commands:",
        syntaxInputPlaceholder: "push(5,1,2,4,55) pop() pop() multipop(2)",
        exampleInfo: "This is how your commands will be executed step-by-step:",
        nextButton: "Next",
        startSyntaxBtn: "Start Execution",
        endOfExample: "End of commands.",
        endButton: "End",
        bestCase: "Best Case",
        worstCase: "Worst Case",
        selectCase: "Select Case",
        bestWorstDescription: "Select Best or Worst case to execute:",
        executeBestCase: "Executing Best Case...",
        executeWorstCase: "Executing Worst Case...",
        closeExecutionBtn: "Close",
        bestCaseDescription: "This is the best case scenario for the Multipop algorithm.",
        worstCaseDescription: "This is the worst case scenario for the Multipop algorithm.",
        endOfExample: "End of commands.",
        pushDetail: "We're pushing element {value} onto the stack. Potential increases by 1.",
        popDetail: "We remove the top element {removedValue} from the stack. Potential decreases by 1.",
        multipopDetail: "We remove {count} elements at once: {removedValues}. Potential decreases by {count}."
    },
    cz: 
    {
        title_main: "Hlavní Stránka",
        navBrand: "Amortizovaná Složitost",
        aboutAppBtn: "O Mé Bakalářské Práci",
        backBtn: "<i class='fas fa-arrow-left'></i> Zpět",
        algorithm1: "Multipop na Zásobníku",
        aboutModalLabel: "O Mé Bakalářské Práci",
        aboutModalText: "Tato bakalářská práce ukazuje amortizovanou složitost tří vybraných algoritmů vyučovaných v magisterském kurzu teoretické informatiky.",
        aboutModalText2: "Pro každý algoritmus může uživatel zažít změny ve složitosti, například specifikováním různých hodnot, a může vidět průběh algoritmu.",
        closeBtn: "Zavřít",
        manualParamsModalLabel: "Nastavení Parametrů Zásobníku",
        stackValuesLabel: "Zadejte hodnoty zásobníku:",
        submitBtn: "Odeslat",
        randomParamsModalLabel: "Nastavení Náhodných Parametrů Zásobníku",
        rangeMinLabel: "Minimální hodnota:",
        rangeMaxLabel: "Maximální hodnota:",
        countLabel: "Počet Hodnot:",
        generateBtn: "Generovat",
        footerText: "Vytvořil Martin Dressler, DRE0065",
        multipopTitle: "Multipop na Zásobníku",
        multipopAbout: "O Multipop na Zásobníku",
        multipopDescription: `
            <p><strong>Multipop na Zásobníku</strong> je algoritmus, který ilustruje koncept amortizované složitosti pomocí zásobníkových operací.</p>
            <p>Zásobník umožňuje dvě základní operace:</p>
            <ul>
              <li><strong>Push</strong> - vložení prvku do zásobníku.</li>
              <li><strong>Pop</strong> - odstranění prvku ze zásobníku.</li>
            </ul>
            <p>Algoritmus Multipop rozšiřuje tyto operace, aby umožnil odstranit více prvků najednou, čímž zvyšuje efektivitu zásobníku pro určité aplikace.</p>
            <p>Použitím amortizované analýzy zjistíme, že průměrné náklady každé operace, včetně multipopu, zůstávají efektivní a dosahují amortizované složitosti <strong>O(1)</strong> na operaci.</p>
        `,
        manualButton: "Manuálně",
        randomButton: "Náhodně",
        bestWorstButton: "Nejhorší/Nejlepší Případ",
        enterValuePrompt: "Zadejte kladné číslo, které chcete přidat do zásobníku:",
        invalidNumberAlert: "Zadejte platné kladné číslo!",
        stackEmptyAlert: "Zásobník je prázdný!",
        multipopPrompt: "Zadejte počet prvků, které chcete odebrat:",
        stepCount: "Počet Kroků",
        potential: "Potenciál",
        pushButton: "Přidat",
        popButton: "Odebrat",
        multipopButton: "Multipop",
        syntaxButton: "Syntaxe",
        syntaxModalLabel: "Syntaxové Příkazy",
        syntaxInfo: "Zadejte své syntaxové příkazy níže.",
        syntaxInputLabel: "Syntaxové Příkazy:",
        syntaxInputPlaceholder: "push(5,1,2,4,55) pop() pop() multipop(2)",
        exampleInfo: "Takto budou vaše příkazy vykonávány krok za krokem:",
        nextButton: "Další",
        startSyntaxBtn: "Spustit Vykonávání",
        endOfExample: "Konec příkazů.",
        endButton: "Konec",
        bestCase: "Nejlepší Případ",
        worstCase: "Nejhorší Případ",
        selectCase: "Vyberte Případ",
        bestWorstDescription: "Vyberte nejlepší nebo nejhorší případ k provedení:",
        executeBestCase: "Provádí se Nejlepší Případ...",
        executeWorstCase: "Provádí se Nejhorší Případ...",
        closeExecutionBtn: "Zavřít",
        bestCaseDescription: "Toto je nejlepší případ pro algoritmus Multipop.",
        worstCaseDescription: "Toto je nejhorší případ pro algoritmus Multipop.",
        endOfExample: "Konec příkazů.",
        pushDetail: "Vkládáme prvek {value} do zásobníku. Potenciál se zvyšuje o 1.",
        popDetail: "Odstraňujeme prvek {removedValue} ze zásobníku. Potenciál se snižuje o 1.",
        multipopDetail: "Najednou odstraňujeme {count} prvků: {removedValues}. Potenciál se snižuje o {count}."
    }
};
const product = {
    yellow: {
        name: "yellow",
        price: 1000,
        img: 'images/products/желтые.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    red: {
        name: "red",
        price: 1000,
        img: 'images/products/крассные.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    blue: {
        name: "blue",
        price: 1000,
        img: 'images/products/синие.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    black: {
        name: "black",
        price: 1000,
        img: 'images/products/черные.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    }
}

const productBtns = document.querySelectorAll('.wrapper__list-btn'),
    basketBtn = document.querySelector('.wrapper__navbar-btn'),
    basketModal = document.querySelector('.wrapper__navbar-basket'),
    closeBasketModal = document.querySelector('.wrapper__navbar-close'),
    basketChecklist = document.querySelector('.wrapper__navbar-checklist'),
    totalPriceBasket = document.querySelector('.wrapper__navbar-totalprice'),
    basketBtnCount = document.querySelector('.warapper__navbar-count')
    btncard = document.querySelector('.wrapper__navbar-bottom');
    print__body = document.querySelector('.print__body'),
    print__footer = document.querySelector('.print__footer')


productBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
        plusOrMinus(this);
    });
});

function plusOrMinus(btn) {
    let parent = btn.closest('.wrapper__list-card'),
        parentId = parent.getAttribute('id')
    product[parentId].amount++
    basket()
}

function basket() {
    const productArray = []
    for (const key in product) {
        let totalCount = 0;
        const po = product[key]
        const productCard = document.querySelector(`#${po.name.toLowerCase()}`),
            parentIndecator = productCard.querySelector('.wrapper__list-count')
        if (po.amount) {
            productArray.push(po)
            basketBtnCount.classList.add('active');
            parentIndecator.classList.add('active');
            parentIndecator.innerHTML = po.amount;
            totalCount += po.amount
        } else {
            parentIndecator.classList.remove('active')
            parentIndecator.innerHTML = 0
        }
        basketBtnCount.innerHTML = totalCount
    }
    basketChecklist.innerHTML = ''
    for (let i = 0; i < productArray.length; i++) {
        basketChecklist.innerHTML += cardItemBurger(productArray[i])
    }
    const allCount = totalCountProduct()
    if (allCount) {
        basketBtnCount.classList.add('active')
    } else {
        basketBtnCount.classList.remove('active')
    }
    basketBtnCount.innerHTML = allCount
    totalPriceBasket.innerHTML = totalSummProduct()
}

function totalCountProduct() {
    let total = 0
    for (const key in product) {
        total += product[key].amount
    }
    return total
}
function totalSummProduct() {
    let total = 0
    for (const key in product) {
        total += product[key].totalSum
    }
    return total
}

function cardItemBurger(productData) {
    const {
        name,
        amount,
        img,
        totalSum
    } = productData

    return `
  
  <div class="wrapper__navbar-product">
      <div class="wrapper__navbar-info">
         <img src="${img}" alt="" class="wrapper__navbar-productImage">
         <div class="wrapper__navbar-subInfo">
          <p class="wrapper__navbar-infoName">${name}</p>
          <p class="wrapper__navbar-infoPrice">${totalSum}</p>
         </div>
      </div>
      <div class="wrapper__navbar-option" id="${name.toLowerCase()}_card">
          <button class="wrapper__navbar-symbol fa-plus" data-symbol="+">+</button>
          <span class="wrapper__navbar-count">${amount}</span>
          <button class="wrapper__navbar-symbol fa-minus" data-symbol="-">-</button>
      </div>
  </div>
  `

}

window.addEventListener('click',function(el){
    const btn = el.target
    if (btn.classList.contains('wrapper__navbar-symbol')){
       const attr = btn.getAttribute('data-symbol')
       const parent = btn.closest('.wrapper__navbar-option')
       if (parent){
        const idProduct = parent.getAttribute('id').split('_')[0]
        if(attr == '+') product[idProduct].amount++
        else if(attr == '-') product[idProduct].amount--
        basket()
       }
    }
})

basketBtn.addEventListener('click', () => {
    basketModal.classList.add('active')
})
closeBasketModal.addEventListener('click', () => {
    basketModal.classList.remove('active')
})

btncard.addEventListener('click', function(){
    print__body.innerHTML = ''
    for (const key in product) {
       const {name, amount, totalSum} = product[key];
       if(amount){
        print__body.innerHTML += `
        <div class="print__body-item">
                <div class="print__body-item_name">
                    <span>${name}</span>
                    <span>${amount}</span>
                </div>
                <p class="print__body-item_summ">${totalSum}</p>
            </div>
        `;
       }
           
    }

    print__footer.innerHTML = totalSummProduct()

    window.print();
})










const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

class Quiz
{
	constructor(type, questions, results)
	{

		this.type = type;


		this.questions = questions;

		this.results = results;

		this.score = 0;

		this.result = 0;

		this.current = 0;
	}

	Click(index)
	{
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;


		if(value >= 1)
		{
			correct = index;
		}
		else
		{

			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}


	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}


	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 


class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}


class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}


class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}


	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}


const results = 
[
	new Result("Вам многому нужно научиться, удачи всем", 4),
	new Result("Вы все  просто супер)", 8),
	new Result("Ваш уровень выше среднего", 12),
	new Result("Красавчики так держать все команды молодцы", 14)
];


const questions = 
[
	
	new Question("Какое из трех государств Средней Азии было самой большой по площади в середине XIX века?", 
	[
		new Answer("поехали дальше", 1)
	]),
	new Question("Кто такой кушбеги или диванбеги и какое значение они имели в Ханствах XIX века", 
	[
		new Answer("далее", 1)
	]),
	new Question("Шейх-ул-Ислам, что это такое и какое значение имеет в истории трех ханств  ", 
	[
		new Answer("далее", 1)
	]),
	new Question("Какая страна  одержала победу во Франко-Прусской войне и когда это произошло?", 
	[
		new Answer("далее", 1),
	]),
	new Question("Как Вы понимаете значение депеша или эсмкая депеша", 
	[
		new Answer("далее", 1),
	]),
	new Question("Что такое Эльзас и Лотарингия?", 
	[
		new Answer("далее", 1),
	]),
	new Question("Как называли земли в Средннней Азии выдаваемые Ханом под стоительтсво благотворительных сооружений, мечетей и медресе", 
	[
		new Answer("далее", 1),
	]),
	new Question("Как называли поземельный налог 1/5/10 части урожая в пользу государства?", 
	[
		new Answer("далее", 1),
	]),
	new Question("Как звали Французского Императора проигравшего войну Пруссии в 1871 году?", 
	[
		new Answer("далее", 1),
	]),
	new Question("Есть ли у Вас вопросы по самостотельной работе?", 
	[
		new Answer("далее", 1),
	]),

];


const quiz = new Quiz(1, questions, results);

Update();


function Update()
{

	if(quiz.current < quiz.questions.length) 
	{

		headElem.innerHTML = quiz.questions[quiz.current].text;


		buttonsElem.innerHTML = "";


		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		

		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		Init();
	}
	else
	{

		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Ваши очки: " + quiz.score;
	}
}

function Init()
{

	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{

		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{

	let correct = quiz.Click(index);


	let btns = document.getElementsByClassName("button");


	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct) 
		{
			btns[index].className = "button button_wrong";
		} 
	}
	else
	{

		btns[index].className = "button button_correct";
	}


	setTimeout(Update, 1000);
}








$(document).ready(function () {
	all_notes = $("li a");
  
	all_notes.on("keyup", function () {
	  note_title = $(this).find("h2").text();
	  note_content = $(this).find("p").text();
  
	  item_key = "list_" + $(this).parent().index();
  
	  data = {
		title: note_title,
		content: note_content
	  };
  
	  window.localStorage.setItem(item_key, JSON.stringify(data));
	});
  
	all_notes.each(function (index) {
	  data = JSON.parse(window.localStorage.getItem("list_" + index));
  
	  if (data !== null) {
		note_title = data.title;
		note_content = data.content;
  
		$(this).find("h2").text(note_title);
		$(this).find("p").text(note_content);
	  }
	});
  });
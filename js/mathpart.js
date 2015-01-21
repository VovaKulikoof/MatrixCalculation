var App = (function() {
	var CounterWrite = 0;
	return {
		//Вытаскивает значение полей ввода и заносит их в матрицу 
		SaveArray : function(NameBlock,Size){ 
			var key;
			var localArray = new Array();
			var OB = $(NameBlock),h;
			OB.find('input').removeClass('wrongExp');
			for(var i=0;i<=Size;i++){
				localArray[i] = [];
				for(var j=0;j<=Size;j++){
					key = i+'-'+j;
					if(OB.find('input[data-dir = '+key+']').val() == ""){
						localArray[i][j] = "";
					};
					h = OB.find('input[data-dir = '+key+']').val();
					if(!(parseInt(h,10) === h*1)){
								OB.find('input[data-dir = '+key+']').addClass('wrongExp');
								continue;
							}
					localArray[i][j] = OB.find('input[data-dir = '+key+']').val();
				}
			}
			return localArray;
		},
		//Вытаскивает значение полей ввода и заносит их в матрицу(версия для СЛУ)
		SaveAnswerArray : function(NameBlock,Size){
			var A = [];
			var Ob = $(NameBlock);
			Ob.find('input[data-dir = '+i+']').removeClass('wrongExp');
			for(var i = 0; i<=Size;i++){
				A[i] = [];
			A[i].push(Ob.find('input[data-dir = '+i+']').val());
			if(!(parseInt(A[i][0],10) === A[i][0]*1)){
				Ob.find('input[data-dir = '+i+']').addClass('wrongExp');
			}
		}
		return A;
	},
	//Проводит филтрациию матрицы на пустые строки и столбцы
	FilterArray : function(SaveArr,Size){
		var Empty = false;
		var key;
		var f=0;
		var FilterArr = new Array();
		for(var i = 0;i<=Size;i++){
			for(var j=0;j<=Size;j++){
				if(SaveArr[i][j] !== '') {
					Empty = false;
					break;
				}
				else {Empty = true;};
			};
			if(!Empty){
				FilterArr[f] = [];
				for(var j = 0; j<=Size;j++){
					FilterArr[f][j] = SaveArr[i][j];
				};
				f++;
			};
		};
		f=f-1;
		Empty = false;
		var FilterArrTwo = new Array();
		var g=0;
		
		for(var i = 0;i<=Size;i++){
			for(var j= 0;j<=f;j++){
				if(FilterArr[j][i] !== '') {
					Empty = false;
					break;
				}
				else {Empty = true;};
			}
			if(!Empty){
				FilterArrTwo[g] = [];
				for(var j=0;j<=f;j++){
					if(FilterArr[j][i] == ""){
						FilterArrTwo[g][j] = '0';
						continue;
					}
					FilterArrTwo[g][j] = FilterArr[j][i];
				}
				g++;
			}
		}
		FilterArrTwo = App.TransArray(FilterArrTwo);
		return FilterArrTwo;
				},
	//Транспонирует матрицу
	TransArray : function(Arr){
		var m=Arr.length,n = Arr[0].length, ArrT= [];
		for(var i=0;i<n;i++){
			ArrT[i] = [];
			for(var j=0;j<m;j++){
				ArrT[i][j] = Arr[j][i];
			}
		}
		return ArrT;
		},
	//заносит в поля ввода значение из матрицы
	WriteInput : function(SaveArr,NameBlock){
		var key;
		var OB1 = $(NameBlock);
		for(var i=0;i<SaveArr.length;i++){
			for(var j=0;j<SaveArr[0].length;j++){
				key = i+'-'+j;
				OB1.find('input[data-dir = '+key+']').val(SaveArr[i][j]);
			}
		};
	},
	//очищает поля ввода
	Clear : function (NameBlock,Size){
		var key;
		var OBTrash = $(NameBlock);
		for(var i=0;i<=Size;i++){
			for(var j=0;j<=Size;j++){
				key = i+'-'+j;
				OBTrash.find('input[data-dir = '+key+']').val('');
			}
		};
	},
	//переводит стрчные значение в числа
	FromStringToNumber : function (M){
		for(var i = 0 ; i<M.length;i++){
			for(var j =0;j<M[0].length;j++){
				M[i][j] = M[i][j]*1;
			}
		}
		return M;
	},
	//определяет ранг матрицы
	Rang : function (M){
		var rang = 0;
		var label = 0;
		for(var i = 0;i<M.length;i++)
		{
			for(var j = 0;j<M[0].length;j++)
			{
				if( M[i][j] == 0)
					{label= label + 1};
			}
			if (label == M[0].length) 
				{rang = rang + 1;};
			label = 0;
		}
		return M.length - rang;
	},
	//Отрисовывает матрицу или матрицы , а также отрисовывает действия с ними 
	WriteAnswers : function(WriteArray,NameBlock,Gays,i,g,Did,schBlock,Koef,Reverse,E,ReverseMylti){
		var Name = $(NameBlock);
		var IdTable = i+g+Did+'matr'+schBlock+CounterWrite;
		var rowN = g*1+1;
		var lineN = i*1+1;
		if(Gays){
			Name.append('<div class="GaysAnswer">From row <p class="numberAnswer">'+rowN+'</p> subtract line <p class="numberAnswer">'+lineN+'</p> multiplied by <p class="numberAnswer">'+Koef.toFixed(3)+'</p></div><br>')
		}
		if(ReverseMylti){
			Name.append('<div class="GaysAnswer">Multiply line <p class="numberAnswer">'+rowN+'</p> by <p class="numberAnswer">'+Koef.toFixed(3)+'</p></div><br>')	
		}
		Name.append('<mtable class="TableGays"  id="'+IdTable+'">');
		for(var i=0;i<WriteArray.length;i++){
			Name.find('#'+IdTable).append('<mtr id="'+'mt'+IdTable+'-'+i+'">');
			for(var j=0;j<WriteArray[0].length;j++){
				var stri = '#mt'+IdTable+'-'+i;
				$('#'+IdTable).find(stri).append('<mtd><mrow><mn>'+WriteArray[i][j].toFixed(2)+'</mn></mrow></mtd>');
			}	
		}
		if(Reverse){
				for(var i=0;i<E.length;i++){
					for(var j=0;j<E[0].length;j++){
						var stri = '#mt'+IdTable+'-'+i;
						$('#'+IdTable).find(stri).append('<mtd><mrow><mn>'+E[i][j].toFixed(2)+'</mn></mrow></mtd>');
					}	
					for(var t=0;t<WriteArray.length;t++){
						Name.find('mtd:nth-child('+WriteArray.length+')').css({
							'border-right': '1px solid #000'
						});
					}
				}
		}
		CounterWrite++;
		},
	//создает блок для отрисовки матриц
	CreateNewAnswerBlock : function(NameBlock){
		var WhereWrite = $('#WindowAnswer');
		WhereWrite.prepend('<div class="Answer" id="'+NameBlock+'"><button class="smallbut"><span class="icon-trash"></span>Clear</button></div>')
	},
	//приводит матрицу к ступенчатому виду
	StepLook : function(M,schBlock){
		var Koef;
		var flag;
		var Di = 0;
		var schBlock2 = '#'+schBlock;
		App.WriteAnswers(M,schBlock2,false,0,0,'answ',schBlock,0,false,0,false);
		for(var i=0; i<M.length -1; i++)
		{	if(Di>=M[0].length)
			{break;}
			flag=false;
			while (!flag)
			{
				if(M[i][Di] == 0)
				{
					for(var t = i+1;t<M.length;t++)
					{
						if(M[t][Di] !== 0)
						{
							for(var j=0;j<M[i].length;j++)
								{M[i][j] = M[i][j] + M[t][j];}
								App.WriteAnswers(M,schBlock2,true,t,i,Di,schBlock,-1,false,0,false);
							flag = true;
							break;
						}
					}
				}
				else {flag = true;}
				if(!flag)
				{Di = Di+1;}
			}
			for(var g = i+1;g<M.length;g++)
			{
				if(M[g][Di] == 0)
					{continue;}
				Koef = M[g][Di]/M[i][Di];
				for(var j =0;j<M[g].length;j++)
				{
					M[g][j] = M[g][j] - M[i][j]*Koef;
				}
				App.WriteAnswers(M,schBlock2,true,i,g,Di,schBlock,Koef,false,0,false);
			}
			Di=Di+1;
		}
		for(var i=0; i<M.length; i++){
			for(var j=0; j<M[0].length; j++){
				M[i][j] = M[i][j].toFixed(2);
			}
		}
		return M;
	},
	//определяет определитель матрицы
	DeterminantGays : function(M){
		var i,g;
		var det2 = 1;
		for(i = 0; i<M.length;i++){
			for(g = 0; i<M[0].length;g++){
				if( g === i){
					det2 = det2 * M[i][g]; 
					break;
				}
			}
		}
		return det2;
	},
	//производит сложение или вычитание матриц
	SumMatrix : function (A,B,K){   
		var m = A.length, n = A[0].length, C = [];
	    for (var i = 0; i < m; i++)
	     { C[i] = [];
	       for (var j = 0; j < n; j++) C[i][j] = A[i][j]*1+K*B[i][j];
	     }
	    return C;
	},
	//Умножает матрицу на число
	MyltiMatrNum : function(n,M){
		for(var i =0;i<M.length;i++){
			for(var j=0;j<M[0].length;j++){
				M[i][j] = M[i][j] * n;
			}
		}
		return M;
	},
	//умножает матрицу на матрицу
	MultiplyMatrix : function(A,B){
	    var rowsA = A.length, colsA = A[0].length,
	        rowsB = B.length, colsB = B[0].length,
	        C = [];
	    if (colsA != rowsB) return false;
	    for (var i = 0; i < rowsA; i++) C[i] = [];
	    for (var k = 0; k < colsB; k++)
	     { for (var i = 0; i < rowsA; i++)
	        { var t = 0;
	          for (var j = 0; j < rowsB; j++) t += A[i][j]*B[j][k];
	          C[i][k] = t;
	        }
	     }
	    return C;
	},
	//возводит матрицу в степень
	MatrPow : function(n,A){ 
	    if (n == 1) return A;     
	    else return App.MultiplyMatrix(A,App.MatrPow(n-1,A));
	},
	//приводит матрицу к ступенчатому виду и вычисляет обратную матрицу
	StepLookReversMatrix : function(M,schBlock){
			var E = [],p,u,z;
			var Koef;
			var flag;
			var Di = 0;
			var schBlock3 = '#'+schBlock;
			for(p = 0;p<M.length;p++){
				E[p] = [];
				for(u = 0;u<M[0].length;u++)
					{
						if (p === u) {E[p][u] = 1}
						else E[p][u] = 0;
					}
			};
			App.WriteAnswers(M,schBlock3,false,0,0,0,schBlock,0,true,E,false);
			for(var i=0; i<M.length -1; i++)
			{	
				for(var g = i+1;g<M.length;g++)
				{
					if(M[g][Di] == 0)
						{continue;}
					Koef = M[g][Di]/M[i][Di];
					for(var j =0;j<M[g].length;j++)
					{
						M[g][j] = M[g][j] - M[i][j]*Koef;
						E[g][j] = E[g][j] - E[i][j]*Koef;
					}
					App.WriteAnswers(M,schBlock3,true,i,g,Di,schBlock,Koef,true,E,false);
				}
				Di=Di+1;
			}
			for(p = 0; p<M.length;p++){
				for(u = 0;u<M[0].length;u++){
					if (p === u) {
						Koef = 1/M[p][p];
						for(z = 0;z < M[0].length;z++)
							{
								M[p][z] = M[p][z] * Koef;
								E[p][z] = E[p][z] * Koef;
							}
						App.WriteAnswers(M,schBlock3,false,z,u,Di,schBlock,Koef,true,E,true);
						break;
					}
					else {continue};
				}
			}
			for(var i = M.length - 1;i>0;i--)
			{
				for(var g = i-1; g>=0;g--)
				{
					Koef = M[g][i];
					for(var j = 0 ; j<M[0].length;j++)
					{
						M[g][j] = M[g][j] - M[i][j]*Koef;
						E[g][j] = E[g][j] - E[i][j]*Koef;
					}
					App.WriteAnswers(M,schBlock3,true,i,g,Di,schBlock,Koef,true,E,false);
				}
			}
		for(var i=0; i<E.length; i++){
				for(var j=0; j<E[0].length; j++){
					E[i][j] = E[i][j].toFixed(2);
				}
			}
			return E;
		},
	//отрисовывет марицу-ответ в начало блока отрисовки
	WriteMainAnswer : function(IdAnswer,WriteArray){
		 $('#'+IdAnswer+' mtable:nth-child(2)').after('<mtable class="answerMtr">');
		 for(var i=0;i<WriteArray.length;i++){
		 	$('#'+IdAnswer+' mtable:nth-child(2)').next().append('<mtr  id="answerMtr'+IdAnswer+i+'">');
		 	for(var j=0;j<WriteArray[0].length;j++){
		 		$('#answerMtr'+IdAnswer+i).append('<mtd><mrow><mn>'+WriteArray[i][j]+'</mn></mrow></mtd>');
		 	}
		 }
	},
	//отрисовывет марицу-ответ в начало блока отрисовки и отрисовывет ответ после
	WriteRangAnswer : function(IdAnswer,WriteArray,StringAnswer){
		 $('#'+IdAnswer+' mtable:nth-child(2)').after('<mtable class="answerMtr">');
		 for(var i=0;i<WriteArray.length;i++){
		 	$('#'+IdAnswer+' mtable:nth-child(2)').next().append('<mtr  id="answerMtr'+IdAnswer+i+'">');
		 	for(var j=0;j<WriteArray[0].length;j++){
		 		$('#answerMtr'+IdAnswer+i).append('<mtd><mrow><mn>'+WriteArray[i][j]+'</mn></mrow></mtd>');
		 	}
		 }
		 $('#'+IdAnswer+' mtable:nth-child(2)').next().after('<div class="rankAnswer">'+StringAnswer+'</div>');
	},
	//отрисовывает и решает СЛУ
	SLE_Solve : function(xArray,E,schBlock){
		var p,u,z;
		var Koef;
		var flag;
		var Di = 0;
		var schBlock5 = '#'+schBlock;
			var rowX = xArray.length , colX = xArray[0].length;
		if(rowX === colX){	
		App.WriteAnswers(xArray,schBlock5,false,0,0,0,schBlock,0,true,E,false);
		for(var i=0; i<xArray.length -1; i++)
		{	
			for(var g = i+1;g<xArray.length;g++)
			{
				if(xArray[g][Di] == 0)
					{continue;}
				Koef = xArray[g][Di]/xArray[i][Di];
				for(var j =0;j<xArray[g].length;j++)
				{
					xArray[g][j] = xArray[g][j] - xArray[i][j]*Koef;
				}
					E[g][0] = E[g][0] - E[i][0]*Koef;
				App.WriteAnswers(xArray,schBlock5,true,i,g,Di,schBlock,Koef,true,E,false);
			}
			Di=Di+1;
		}
		for(p = 0; p<xArray.length;p++){
			for(u = 0;u<xArray[0].length;u++){
				if (p === u) {
					Koef = 1/xArray[p][p];
					for(z = 0;z < xArray[0].length;z++)
						{
							xArray[p][z] = xArray[p][z] * Koef;
						}
							E[p][0] = E[p][0] * Koef;
					App.WriteAnswers(xArray,schBlock5,false,z,u,Di,schBlock,Koef,true,E,true);
					break;
				}
				else {continue};
			}
		}
		for(var i = xArray.length - 1;i>0;i--)
		{
			for(var g = i-1; g>=0;g--)
			{
				Koef = xArray[g][i];
				for(var j = 0 ; j<xArray[0].length;j++)
				{
					xArray[g][j] = xArray[g][j] - xArray[i][j]*Koef;
					
				}
				E[g][0] = E[g][0] - E[i][0]*Koef;
				App.WriteAnswers(xArray,schBlock5,true,i,g,Di,schBlock,Koef,true,E,false);
			}
		}
	for(var i=0; i<E.length; i++){
			for(var j=0; j<E[0].length; j++){
				E[i][j] = E[i][j].toFixed(2);
			}
		}
		return E;}
		else{
			if(rowX > colX){
				return 0;
			}
			else{
				return 1;
				}
		}
	},
	//Функция инициализации (события)
	Init : function(){
	App.CreateInput("#wrapInputOne",2);
	App.CreateInput("#wrapInputTwo",2);
	App.CreateInput_SLE("#SLE_Inputs",2);
	var sch1 = 3;
	var sch2 = 3;
	var sch3 = 3;
	var schBlock = 0;
	$(document).on('click','.Answer .smallbut', function(){
		$(this).parent().remove();
		});
	$('#GaysMethod').click(function(){
		var arX = App.FromStringToNumber(App.FilterArray(App.SaveArray('#SLE_Inputs',sch3-1),sch3-1));
		var anX = App.FromStringToNumber(App.SaveAnswerArray('.AnswerInput',arX.length-1));
		App.CreateNewAnswerBlock(schBlock);
		anX  = App.SLE_Solve(arX,anX,schBlock);
		if(anX === 0){
			$('#'+schBlock).append('<div>System have not answers</div>');
		}
		if(anX === 1){
			$('#'+schBlock).append('<div>System have infinity answers</div>');
		}
		else{
		App.WriteMainAnswer(schBlock,anX);}
		schBlock++;
		console.log(anX);
	});
	$('#MyltiplayMatr').click(function(){
			var FirstAr = App.FilterArray(App.SaveArray('#wrapInputOne',sch1-1),sch1-1);
			var SecondAr = App.FilterArray(App.SaveArray('#wrapInputTwo',sch2-1),sch2-1);
			if(FirstAr[0].length === SecondAr.length){
			App.CreateNewAnswerBlock(schBlock);
			FirstAr = App.MultiplyMatrix(FirstAr,SecondAr);
			App.WriteAnswers(FirstAr,'#'+schBlock,false,0,0,'answMy',schBlock,0,false,0,false);
				}
				else{alert('Wrong size matrix');}
	});
	$('#SwapBut').click(function(){
		var swaparrayOne = App.SaveArray('#wrapInputOne',sch1-1);
		var swaparrayTwo = App.SaveArray('#wrapInputTwo',sch2-1);
		sch1 = swaparrayTwo.length;
		sch2 = swaparrayOne.length;
		App.IncremenInput("#wrapInputOne",swaparrayTwo.length-1);
		App.IncremenInput("#wrapInputTwo",swaparrayOne.length-1);
		App.WriteInput(swaparrayTwo,'#wrapInputOne');
		App.WriteInput(swaparrayOne,'#wrapInputTwo');
	});
	$('#SumMatr').click(function(){
				var FirstAr = App.FilterArray(App.SaveArray('#wrapInputOne',sch1-1),sch1-1);
				var SecondAr = App.FilterArray(App.SaveArray('#wrapInputTwo',sch2-1),sch2-1);
				if(FirstAr.length === SecondAr.length && FirstAr[0].length === SecondAr[0].length){
				App.CreateNewAnswerBlock(schBlock);
				var AnsAr = App.SumMatrix(FirstAr,SecondAr,1)
				App.WriteAnswers(AnsAr,'#'+schBlock,false,0,0,'answMy',schBlock,0,false,0,false);
				schBlock++;
			}
			else alert('wrong Size');
	});
	$('#MinusMatr').click(function(){
				var FirstAr = App.FilterArray(App.SaveArray('#wrapInputOne',sch1-1),sch1-1);
				var SecondAr = App.FilterArray(App.SaveArray('#wrapInputTwo',sch2-1),sch2-1);
				if(FirstAr.length === SecondAr.length && FirstAr[0].length === SecondAr[0].length){
				App.CreateNewAnswerBlock(schBlock);
				var AnsAr = App.SumMatrix(FirstAr,SecondAr,-1)
				App.WriteAnswers(AnsAr,'#'+schBlock,false,0,0,'answMy',schBlock,0,false,0,false);
				schBlock++;
				}
			else alert('wrong Size');
	});
	$('#IncremOneBut').click(function(){
				if (sch1 < 8){
					var AR = App.FilterArray(App.SaveArray('#wrapInputOne',sch1-1),sch1-1);
				App.IncremenInput("#wrapInputOne",sch1);
				sch1++;
				App.WriteInput(AR,'#wrapInputOne');
			}
			});
	$('#DecremOneBut').click(function(){
				if (sch1 > 1){
					var AR = App.FilterArray(App.SaveArray('#wrapInputOne',sch1-1),sch1-1);
					sch1--;
				App.IncremenInput("#wrapInputOne",sch1-1);
				App.WriteInput(AR,'#wrapInputOne');
				}
			});
	$('#IncremTwoBut').click(function(){
				if (sch2 < 8){
				var AR2 = App.FilterArray(App.SaveArray('#wrapInputTwo',sch2-1),sch2-1);
				App.IncremenInput("#wrapInputTwo",sch2);
				sch2++;
				App.WriteInput(AR2,'#wrapInputTwo');
			}
			});
	$('#DecremTwoBut').click(function(){
				if (sch2 > 1){
				var AR2 = App.FilterArray(App.SaveArray('#wrapInputTwo',sch2-1),sch2-1);
				sch2--;
				App.IncremenInput("#wrapInputTwo",sch2-1);
				App.WriteInput(AR2,'#wrapInputTwo');
			}
			});
	$('input.sostavInp').on('focus',function(){
			$(this).prev().addClass('actSostavDiv');		}
		);
	$('input.sostavInp').on('blur',function(){
			$(this).prev().removeClass('actSostavDiv');
			});
	$('#IncremOneBut_SLE').click(function(){
				var arX = App.FromStringToNumber(App.FilterArray(App.SaveArray('#SLE_Inputs',sch3-1),sch3-1));
				var anX = App.FromStringToNumber(App.SaveAnswerArray('.AnswerInput',arX.length-1));
				if (sch3 < 7){
					App.IncremenInput_SLE("#SLE_Inputs",sch3);
					App.WriteInput(arX,"#SLE_Inputs");
				sch3++;}
			});
	$('#DecremOneBut_SLE').click(function(){
				var arX = App.FromStringToNumber(App.FilterArray(App.SaveArray('#SLE_Inputs',sch3-1),sch3-1));
				var anX = App.FromStringToNumber(App.SaveAnswerArray('.AnswerInput',arX.length-1));
				if (sch3 > 2){
					sch3--;
					App.IncremenInput_SLE("#SLE_Inputs",sch3-1);
					App.WriteInput(arX,"#SLE_Inputs");
				}
			});
	$('#TrashMatrOne').click(function(){
				App.Clear('#wrapInputOne',sch1);
	});
	$('#TrashMatrTwo').click(function(){
				App.Clear('#wrapInputTwo',sch2);
	});
	$('#SLE_Trash').click(function(){
		App.Clear('#SLE_Inputs',sch3);
	});
	$('#DetMatrOne').click(function(){
			var detarray = App.FilterArray(App.SaveArray('#wrapInputOne',sch1-1),sch1-1);
			detarray = App.FromStringToNumber(detarray);
			if(detarray.length === detarray[0].length)
			{
			App.CreateNewAnswerBlock(schBlock);
			detarray = App.StepLook(detarray,schBlock);
			var det = App.DeterminantGays(detarray);
			App.WriteRangAnswer(schBlock,detarray,'Determinant = <span class="numberAnswer">'+det.toFixed(2)+'</span>');
			schBlock++;}
			else alert ('no squadMatrix');
	});
	$('#InverseMatrOne').click(function(){
		var inverseArray = App.FilterArray(App.SaveArray('#wrapInputOne',sch1-1),sch1-1);
			inverseArray = App.FromStringToNumber(inverseArray);
			if(inverseArray.length === inverseArray[0].length){
				App.CreateNewAnswerBlock(schBlock);
				inverseArray = App.StepLookReversMatrix(inverseArray,schBlock);
				App.WriteMainAnswer(schBlock,inverseArray);
				schBlock++;
			}
			else{
					alert('No squadMatrix');
					schBlock++;
				};
	});
	$('#TransporationMatrOne').click(function(){
			var transporationArray = App.FilterArray(App.SaveArray('#wrapInputOne',sch1-1),sch1-1);
			transporationArray = App.FromStringToNumber(transporationArray);
			App.CreateNewAnswerBlock(schBlock);
			transporationArray = App.TransArray(transporationArray);
			App.WriteAnswers(transporationArray,'#'+schBlock,false,2,0,'answMy4',schBlock,0,false,0,false);
			schBlock++;
	});
	$('#RangMatrOne').click(function(){
			var rangArray = App.FilterArray(App.SaveArray('#wrapInputOne',sch1-1),sch1-1);
			rangArray = App.FromStringToNumber(rangArray);
			App.CreateNewAnswerBlock(schBlock);
			rangArray = App.StepLook(rangArray,schBlock);
			var R = App.Rang(rangArray);
			App.WriteRangAnswer(schBlock,rangArray,'Rank = <span class="numberAnswer">'+R.toFixed(2)+'</span>');
			schBlock++;
	});
	$('#TrigleMatrOne').click(function(){
			var trigleArray = App.FilterArray(App.SaveArray('#wrapInputOne',sch1-1),sch1-1);
			trigleArray = App.FromStringToNumber(trigleArray);
			App.CreateNewAnswerBlock(schBlock);
			trigleArray = App.StepLook(trigleArray,schBlock);
			App.WriteMainAnswer(schBlock,trigleArray);
			schBlock++;
	});
	$('#MyltipMatrOne').click(function(){
			var myltipArray = App.FilterArray(App.SaveArray('#wrapInputOne',sch1-1),sch1-1);
			myltipArray = App.FromStringToNumber(myltipArray);
			var mylNum = $("#MyltipNumMatrOne").val();
			mylNum = mylNum * 1;
			myltipArray = App.MyltiMatrNum(mylNum,myltipArray)
			App.CreateNewAnswerBlock(schBlock);
			App.WriteAnswers(myltipArray,'#'+schBlock,false,0,0,'answMyl',schBlock,0,false,0,false);
			schBlock++;
	});
	$('#InvolutMatrOne').click(function(){
			var involutArray = App.FilterArray(App.SaveArray('#wrapInputOne',sch1-1),sch1-1);
			involutArray = App.FromStringToNumber(involutArray);
			var invNum = $("#InvolutNumMatrOne").val();
			invNum = invNum * 1;
			App.CreateNewAnswerBlock(schBlock);
			involutArray = App.MatrPow(invNum,involutArray);
			App.WriteAnswers(involutArray,'#'+schBlock,false,0,0,'answMy',schBlock,0,false,0,false);
			schBlock++;
	});
	$('#DetMatrTwo').click(function(){
			var detarray = App.FilterArray(App.SaveArray('#wrapInputTwo',sch2-1),sch2-1);
			detarray = App.FromStringToNumber(detarray);
			if(detarray.length === detarray[0].length)
			{
			App.CreateNewAnswerBlock(schBlock);
			detarray = App.StepLook(detarray,schBlock);
			var det = App.DeterminantGays(detarray);
			App.WriteRangAnswer(schBlock,detarray,'Determinant = <span class="numberAnswer">'+det.toFixed(2)+'</span>');
			schBlock++;}
			else alert('no squadMatrix');
	});
	$('#InverseMatrTwo').click(function(){
		var inverseArray = App.FilterArray(App.SaveArray('#wrapInputTwo',sch2-1),sch2-1);
			inverseArray = App.FromStringToNumber(inverseArray);
			if(inverseArray.length === inverseArray[0].length){
				App.CreateNewAnswerBlock(schBlock);
				inverseArray = App.StepLookReversMatrix(inverseArray,schBlock);
				App.WriteMainAnswer(schBlock,inverseArray);
				schBlock++;
			}
			else alert('No squadMatrix');
	});
	$('#TransporationMatrTwo').click(function(){
			var transporationArray = App.FilterArray(App.SaveArray('#wrapInputTwo',sch2-1),sch2-1);
			transporationArray = App.FromStringToNumber(transporationArray);
			App.CreateNewAnswerBlock(schBlock);
			transporationArray = App.TransArray(transporationArray);
			App.WriteAnswers(transporationArray,'#'+schBlock,false,2,0,'answMy4',schBlock,0,false,0,false);
			schBlock++;
	});
	$('#RangMatrTwo').click(function(){
			var rangArray = App.FilterArray(App.SaveArray('#wrapInputTwo',sch2-1),sch2-1);
			rangArray = App.FromStringToNumber(rangArray);
			App.CreateNewAnswerBlock(schBlock);
			rangArray = App.StepLook(rangArray,schBlock);
			var R = App.Rang(rangArray);
			App.WriteRangAnswer(schBlock,rangArray,'Rank = <span class="numberAnswer">'+R.toFixed(2)+'</span>');
			schBlock++;
	});
	$('#TrigleMatrTwo').click(function(){
			var trigleArray = App.FilterArray(App.SaveArray('#wrapInputTwo',sch2-1),sch2-1);
			trigleArray = App.FromStringToNumber(trigleArray);
			App.CreateNewAnswerBlock(schBlock);
			trigleArray = App.StepLook(trigleArray,schBlock);
			App.WriteMainAnswer(schBlock,trigleArray);
			schBlock++;
	});
	$('#MyltipMatrTwo').click(function(){
			var myltipArray = App.FilterArray(App.SaveArray('#wrapInputTwo',sch2-1),sch2-1);
			myltipArray = App.FromStringToNumber(myltipArray);
			var mylNum = $("#MyltipNumMatrTwo").val();
			mylNum = mylNum * 1;
			myltipArray = App.MyltiMatrNum(mylNum,myltipArray)
			App.CreateNewAnswerBlock(schBlock);
			App.WriteAnswers(myltipArray,'#'+schBlock,false,0,0,'answMyl',schBlock,0,false,0,false);
			schBlock++;
	});
	$('#InvolutMatrTwo').click(function(){
			var involutArray = App.FilterArray(App.SaveArray('#wrapInputTwo',sch2-1),sch2-1);
			involutArray = App.FromStringToNumber(involutArray);
			var invNum = $("#InvolutNumMatrTwo").val();
			invNum = invNum * 1;
			App.CreateNewAnswerBlock(schBlock);
			involutArray = App.MatrPow(invNum,involutArray);
			App.WriteAnswers(involutArray,'#'+schBlock,false,0,0,'answMy',schBlock,0,false,0,false);
			schBlock++;
	});
	},
	//отрисовка полей ввода
	CreateInput : function(there,much){
			Obj = $(there);
			var key;
				for(var x =0; x<=much; x++)
					{
						for(var y = 0; y<=much; y++)
								{	
									key = x+'-'+y;	
									Obj.append('<input type="number" size="3" data-dir='+key+'>');
								}  
						Obj.append('<br>')	
					}
	},
	//отрисовка полей ввода (увеличение, уменьшение)
	IncremenInput : function(objecM,Direction) {
		objec = $(objecM);
	objec.find('input , br').remove();
	App.CreateInput(objec,Direction)
		},
	//отрисовка полей ввода (увеличение, уменьшение)СЛУ
	IncremenInput_SLE : function(objecM,Direction) {
			objec = $(objecM);
		objec.find('div.SLE_div_inputs , br').remove();
		objec.next().find('div.SLE_div_inputs , br').remove();
		App.CreateInput_SLE(objec,Direction)
	},
	//отрисовка полей ввода СЛУ
	CreateInput_SLE :  function(there,much){
		Obj = $(there);
		var key,num;
			for(var x =0; x<=much; x++)
				{
				for(var y = 0; y<=much; y++)
					{	
						key = x+'-'+y;	
						num = y*1 + 1;
						if(x == 0 || x == "0"){
						if(num == 1)
						Obj.append('<div class="SLE_div_inputs Nomarleft Nomartop "><input type="text" data-dir="'+key+'">
							<div class="ln">x<sub>'+num+'</sub></div><div class="symbol">+</div></div>');
						else
						Obj.append('<div class="SLE_div_inputs Nomartop "><input type="text" data-dir="'+key+'">
							<div class="ln">x<sub>'+num+'</sub></div><div class="symbol">+</div></div>');	
						}
						else {
							if(num == 1)
								Obj.append('<div class="SLE_div_inputs Nomarleft"><input type="text" data-dir="'+key+'">
									<div class="ln">x<sub>'+num+'</sub></div><div class="symbol">+</div></div>');
							else
						Obj.append('<div class="SLE_div_inputs"><input type="text" data-dir="'+key+'">
							<div class="ln">x<sub>'+num+'</sub></div><div class="symbol">+</div></div>');
						} 
					}  
					$('div.SLE_div_inputs:last-child').find('div.symbol').remove();
				Obj.append('<br>');
				if(x == 0 || x == "0")
					Obj.next().append('<div class="SLE_div_inputs Nomartop"><input type="text" data-dir="'+x+'">
						<div class="ravno">=</div></div><br>');
				else
					Obj.next().append('<div class="SLE_div_inputs"><input type="text" data-dir="'+x+'">
						<div class="ravno">=</div></div><br>');
				}
}
}
}());
$(document).ready(function(){
if($("#Evelyn").length)
App.Init();
});
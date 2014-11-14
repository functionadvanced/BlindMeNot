//global variables
var start_time;//ms
var total_time;//ms
var answer;
var level;
var step;
var size = [3,4,5,6,7,8];
var kind = [2,3,4,5,6];
function Init()
{
	step = 0;
	level = 0;
	$('container').style.display = 'block';
	NewLevel();
	DrawTimeLine();
}
function NewLevel()
{
	start_time = (new Date()).getTime();
	total_time = 10 * 1000;
	DrawField(size[level],size[level],'field1');
	DrawField(size[level],size[level],'field2');
	CopyColor('field1','field2');
	Differ(size[level] * size[level]);
}
function RandomColor()
{
	var color = ['turquoise  ','green','red','blue','orange','purple'];
	return color[Math.floor(Math.random() * 100) % kind[step]];
}
function MouseOver(_index, _s)
{
	var f1 = document.getElementById('field1');
	var f2 = document.getElementById('field2');
	f1.children[_index].style.border = Math.floor(_s/8) + 'px solid black';
	f2.children[_index].style.border = Math.floor(_s/8) + 'px solid black';
}
function MouseOut(_index, _s)
{
	var f1 = document.getElementById('field1');
	var f2 = document.getElementById('field2');
	f1.children[_index].style.border = Math.floor(_s/8) + 'px solid white';
	f2.children[_index].style.border = Math.floor(_s/8) + 'px solid white';
}
function Click(_index)
{
	if (_index == answer)
	{
		//next level
		if(++step >= kind.length){
			step = 0;
			if (++level >= size.length){
				ShowInfo('Mission Completed');
				--level;
				return;
			}
		}
		NewLevel();
	}
}
function DrawField(_r, _c, _id)
{
	var field = $(_id);
	var _s = field.clientWidth / _c / 1.25;
	var t_width = _c * _s * 1.25;
	var t_height = _r * _s * 1.25;
	field.style.width = t_width + 'px';
	field.style.height = t_height + 'px';
	for (var i = field.children.length - 1;i >= 0;--i)
		field.removeChild(field.children[i]);
	for (var i = 0;i < _r;++i){
		for (var j = 0;j < _c;++j){
			var grid = document.createElement('div');
			grid.index = i * _r + j;
			grid.style.position = 'absolute';
			grid.style.top = i * _s * 1.25 + 'px';
			grid.style.left = j * _s * 1.25 + 'px';
			grid.style.width = grid.style.height = _s + 'px';
			grid.style.margin = 0;
			grid.style.border = Math.floor(_s/8) + 'px solid white';
			grid.style.borderRadius = _s/3 + 'px';
			grid.style.backgroundColor = RandomColor();
			grid.addEventListener('mouseover',function(){MouseOver(this.index, _s);},false);
			grid.addEventListener('mouseout',function(){MouseOut(this.index, _s);},false);
			grid.addEventListener('click',function(){Click(this.index);},false);
			field.appendChild(grid);
		}
	}
}
function CopyColor(_id1, _id2)
{
	var f1 = document.getElementById(_id1);
	var f2 = document.getElementById(_id2);
	for(var i = 0;i < f1.children.length;++i){
		f2.children[i].style.backgroundColor = f1.children[i].style.backgroundColor;
	}
}
function Differ(_total)
{
	answer = Math.floor(Math.random() * 1000) % _total;
	var f1 = $('field1');
	var f2 = $('field2');
	do{
		f2.children[answer].style.backgroundColor = RandomColor();
	}while(f2.children[answer].style.backgroundColor == f1.children[answer].style.backgroundColor);
}
function DrawTimeLine()
{
	var left_time = total_time - ((new Date()).getTime() - start_time);
	var time_line = $('time_line');
	time_line.innerText = 'level:'+(level * 5 + step + 1)+'/'+(size.length*kind.length);
	if (left_time <= 0)
	{
		//do something
		console.log('mask');
		ShowInfo('fail on level '+(level * 5 + step + 1));
		time_line.style.width = 0;
		return;
	}
	var left_percentage = left_time / total_time;
	time_line.style.width = left_percentage * $('container').clientWidth + 'px';
	time_line.style.backgroundColor = 'hsl('+(left_percentage*200)+',100%,50%)';
	setTimeout('DrawTimeLine()',100);
}
function SwitchMask()
{
	if ($('mask') == null)
	{
		var mask = document.createElement('div');
		mask.id = 'mask';
		mask.style.position = 'absolute';
		mask.style.top = '0';
		mask.style.left = '0';
		mask.style.width = Math.max(document.body.scrollWidth, document.documentElement.clientWidth) +"px";
		mask.style.height = Math.max(document.body.scrollHeight, document.documentElement.clientHeight)+"px";
		mask.style.zIndex = 100;
		mask.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
		document.body.appendChild(mask);
	}
	else
	{
		$('mask').parentNode.removeChild($('mask'));
	}
}
function ShowInfo(_text)
{
	SwitchMask();
	$('info_text').innerText = _text;
	info_box.style.display = "block";
}
function CloseInfo()
{
	SwitchMask();
	info_box.style.display = "none";
	Init();
}
function $(_ele)
{
	return document.getElementById(_ele);
}
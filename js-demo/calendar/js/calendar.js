/**
 + 日历组件 V1.0
 + Date ：2020-1-30
 */
/**
 * 日历构造函数
 * @constructor
 * @name Calendar
 * @param {object} config 配置参数
 */
function Calendar(){
    this.__init.apply(this,arguments);
}

Calendar.prototype = {
    configData : {
        el : '',
        isSelect : false,
        date : new Date(),
        maxYear : 2030,
    },
    __init : function(config){
        if(typeof config !== 'object') return false;
        for(let i in this.configData){
            config[i]?this.configData[i] = config[i]: null;
        }
        this.trig();
    },
    trig : function(){
        // 获取日期格式
        let dateFormat = this.getDate(this.configData.date);
        // 生成日历
        this.createCalendar(dateFormat);
    },
    getDate : function(setDate){
        const date = new Date(setDate);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let today = date.getDate();
        let day = date.getDay();
        let maxDay = this.getMaxDay(month);

        return {year : year, month : month, today : today, maxDay : maxDay}
    },
    createCalendar : function(format){
        let el = this.$(this.configData.el);
        this.getCss(el,{width: 31*7 + 1 + 'px',padding : '10px'});

        let yearMonth = document.createElement('h1');;
        if(this.configData.isSelect &&  typeof this.configData.isSelect == 'boolean'){
            yearMonth.appendChild(this.createRange(1900,this.configData.maxYear,format.year));
            yearMonth.innerHTML += '年';
            yearMonth.appendChild(this.createRange(1,12,format.month));
            yearMonth.innerHTML += '月';
        }else if(!this.configData.isSelect &&  typeof this.configData.isSelect == 'boolean'){
            yearMonth.innerHTML = format.year + '年' + format.month + '月';
            // yearMonth.style.textAlign = 'center';sss
            // yearMonth.style.font = '600 16px/1.5 arial,verdana';
        }
        this.getCss(yearMonth,{'font':'600 16px/1.5 arial,verdana',textAlign:'center'});
        el.appendChild(yearMonth);
        this.selectFun(yearMonth,format);

        this.createElement(el,format);
    },
    createElement : function(el,format){
        let week = document.createElement('div');
        this.getCss(week,{'height':'30px','borderTop':'1px solid #000','borderLeft':'1px solid #000'});
        let weekFormat = ['日','一','二','三','四','五','六']
        for(let w=0;w<7;w++){
            let span = document.createElement('span');
            this.getCss(span,{
                float : 'left',
                width : '30px',
                height : '30px',
                textAlign : 'center',
                font : '400 14px/1.5 arial',
                borderRight : '1px solid #000'
            });
            span.style.lineHeight = '30px';
            span.innerHTML = weekFormat[w];
            week.appendChild(span);
        }
        el.appendChild(week);
        
        let dateDay = document.createElement('div');
        let maxDay = this.getMaxDay(format.month,format.year);
        let lessDay = this.getWeek(format.year,format.month - 1);
        this.getCss(dateDay,{
            height : Math.ceil((lessDay+maxDay)/7)*31+1+'px',
            borderTop : '1px solid #000',
            borderLeft : '1px solid #666'
        });
        for(let i=this.getMaxDay(format.month-1,format.year)-lessDay;i<this.getMaxDay(format.month-1,format.year);i++){
            let a = document.createElement('a');
            a.herf = 'javascript:;';
            a.innerHTML = i;
            this.getCss(a,{
                float : 'left',
                width : '30px',
                height : '30px',
                color : '#999',
                textAlign : 'center',
                font : '400 14px/1.5 arial',
                borderBottom : '1px solid #999',
                borderRight : '1px solid #999',
            });
            dateDay.appendChild(a);
        }
        for(let i=0;i<maxDay;i++){
            let a = document.createElement('a');
            a.herf = 'javascript:;';
            a.innerHTML = i+1;
            this.getCss(a,{
                float : 'left',
                width : '30px',
                height : '30px',
                textAlign : 'center',
                font : '400 14px/1.5 arial',
                borderBottom : '1px solid #666',
                borderRight : '1px solid #666',
            });
            a.onclick = function(){
                alert(this.innerHTML);
            }
            a.onmouseover = function(){
                this.style.backgroundColor = '#6666FF';
            }
            a.onmouseleave = function(){
                this.style.backgroundColor = '';
            }
            dateDay.appendChild(a);
        }
        let moreDay = (7 - (lessDay+maxDay)%7 >= 7)?0:(7-(lessDay+maxDay)%7);
        for(let i=1;i<=moreDay;i++){
            let a = document.createElement('a');
            a.herf = 'javascript:;';
            a.innerHTML = i;
            this.getCss(a,{
                float : 'left',
                width : '30px',
                height : '30px',
                color : '#999',
                textAlign : 'center',
                font : '400 14px/1.5 arial',
                borderBottom : '1px solid #999',
                borderRight : '1px solid #999',
            });
            dateDay.appendChild(a);
        }
        el.appendChild(dateDay);
    },
    createRange : function(start,end,selected){
        let selection = document.createElement('select');
        for(let i=start;i<=end;i++){
            let option = document.createElement('option');
            option.value = option.innerHTML = i;
            (i == selected)?option.setAttribute('selected',true):null;
            selection.appendChild(option);
        }
        return selection;
    },
    selectFun : function(el,format){
        let select = el.getElementsByTagName('select');
        let _this = this;
        for (let i=0;i<select.length;i++){
            select[i].onchange = function(){
                el.parentNode.innerHTML = '';
                if(this.value > 999){
                    _this.configData.date = this.value + ',' + format.month + ',' + format.today;
                }else{
                    _this.configData.date = format.year + ',' + this.value + ',' + format.today;
                }
                _this.trig();
            }
        };
    },
    getWeek : function(years,months){
        let date = new Date(years,months,1);
        return date.getDay();
    },
    getMaxDay : (months,years) => {
        const maxDay31 = [1,3,5,7,8,10,12];
        const maxDay30 = [4,6,8,11];
        let maxDay = 31;
        if(months<=0){
            months = 12;
            years -= 1;
        }else if(months > 12){
            months = 1;
            years += 1;
        }
        // if(month == 2){
        //     ( years%4==0 && years%100!=0 || years%400==0)?maxDay = 29:maxDay=28;
        // }else if(maxDay30.indexOf(months) != -1){
        //     maxDay = 30;
        // }else if(maxDay31.indexOf(months) != -1){
        //     maxDay = 31;
        // }

        if(months == 2){
            ( years%4==0 && years%100!=0 || years%400==0)?maxDay = 29:maxDay=28;
        }else if(maxDay30.includes(months)){
            maxDay = 30;
        }else if(maxDay31.includes(months)){
            maxDay = 31;
        }
        return maxDay;
    },
    $ : function(id,parentEl){
        parentEl = parentEl || document;
        if(typeof id === 'string'){
            if(id.slice(0,1) == '#'){
                return parentEl.getElementById(id.slice(1));
            }else if(id.slice(0,1) == '.'){
                return parentEl.getElementsByClassName(id.slice(1));
            }else{
                return parentEl.getElementsByTagName(id);
            }
        }
    },
    getCss : function(attrElement,attrObj,boolen){
        if(boolen){
            let ret = (attrElement.currentStyle)?attrElement.currentStyle[attrObj]:getComputedStyle(attrElement,null)[attrObj];
            return parseFloat(ret);
        }else{
            for(let i in attrObj){
                if(i == "opacity"){
                    attrElement.style.opacity = attrObj[i]/100;
                    attrElement.style.filter = 'alpha(opacity=' + attrObj[i] + ')';
                }else{
                    attrElement.style[i] = attrObj[i];
                }
            }
        }
    },
}
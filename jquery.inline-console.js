(function( $ ){
    
    var inputstack = [];
    var inputstackpos = 0;

    $.fn.inlineconsole = function() {

        // Load JSON if is not present
        if (typeof JSON === 'undefined'){
            $.getScript('http://ajax.cdnjs.com/ajax/libs/json2/20110223/json2.js');
        }

        this.append('<div class="console"> <h1>Javascript Inline Console</h1> <div class="outputbox"> Welcome!  </div> <div class="inputbox"> &gt;<input type="text" name="data"/> </div> </div>');

        var console = $(".console");
        var cinput = $("input", console);
        var cinputbox = $(".inputbox", console);
        var coutputbox = $(".outputbox", console);

        console.css({'position': 'absolute', 'padding': '5px', 'border': '1px solid #888', 'bottom': '0', 'width': '500px', 'margin': '0 auto', 'background-color': '#ddd', 'font-family': 'courier', 'font-size': '12px'});
        console.find('h1').css({'font-weight': 'bold', 'font-size': '12px', 'margin': '0', 'padding': '0'});
        cinputbox.css({'background-color': '#fff', 'border': '1px solid #999', 'padding-left': '3px'}); 
        cinput.css({'color': '#0000CC', 'width': '70%', 'border': '0px', 'padding-left': '5px', 'font-family': 'courier', 'font-size': '12px', 'outline': 'none'});

        cinput.focus().select();

        cinput.keydown(function (e) {
            var keyCode = e.keyCode || e.which,
            arrow = {left: 37, up: 38, right: 39, down: 40 };

            switch (keyCode) {
                case arrow.left:
                    //..
                    break;
                case arrow.up:
                    if (inputstackpos < inputstack.length) {
                        inputstackpos++;
                    }

                    cinput.val(inputstack[inputstack.length - inputstackpos]);
                    break;
                case arrow.right:

                    break;
                case arrow.down:
                    if (inputstackpos >0){
                        inputstackpos--;
                    }

                    cinput.val(inputstack[inputstack.length - inputstackpos]);
                    break;
                case 13:
                    var code = cinput.val();
                    var result = '';
                    var resultformat = '';
                    var type = 'ok';

                    if (code.length == 0){
                        return;
                    }

                    inputstack.push(code);
                    inputstackpos = 0;

                    try {
                        result = eval(code);
                    } catch (e){
                        result = e.message;
                        type = 'error';
                    }

                    if (type != 'error'){
                        try {
                            resultformat = JSON.stringify(result);
                        } catch (e){
                            resultformat = result;
                        }
                    } else {
                        resultformat = result;
                    }
       
                    var htmlcode = $('<div>&gt; ' + code + '</div>').css({'color':'#0000CC'});
                    var htmlresult = $('<div>' + resultformat + '</div>');
                    var htmlhr =$('<hr/>').css({'border-width': '0px 0px 1px 0px', 'border-style': 'solid', 'border-color': '#bbb'});

                    if (type == 'error') {
                        htmlresult.css({'color':'red'});                    
                    } else {
                        htmlresult.css({'color':'#0066FF'});                    
                    }
                    
                    coutputbox.append(htmlcode);
                    coutputbox.append(htmlresult);
                    coutputbox.append(htmlhr);

                    cinput.val('');
                    return false;

                    break;
            }
        });
    };
})( jQuery );

// Auto-Init
$(document).ready(function(){ $("body").inlineconsole(); });

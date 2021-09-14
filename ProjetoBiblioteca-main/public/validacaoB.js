$("#nome").blur(function () {
    var nome = $("#nome").val();
    if ( nome =='' || !isNaN(nome)) {
        $("#nome").css('borderColor', 'red');
    } else {
        $("#nome").css('borderColor', 'green');
    
        
    }
});
$("#editora").blur(function () {
    var nome = $("#editora").val();
    if ( nome =='' || !isNaN(nome)) {
        $("#editora").css('borderColor', 'red');
    } else {
        $("#editora").css('borderColor', 'green');
    
        
    }
});
$(" #autor").blur(function () {
    var nome = $("#autor").val();
    if ( nome =='' || !isNaN(nome)) {
        $("#autor").css('borderColor', 'red');
    } else {
        $("#autor").css('borderColor', 'green');
    
        
    }
});
$("#categoria").blur(function () {
    var nome = $("#categoria").val();
    if ( nome =='' || !isNaN(nome)) {
        $("#categoria").css('borderColor', 'red');
    } else {
        $("#categoria").css('borderColor', 'green');
    
        
    }
});

$("#ano").blur(function () {
    var ano = $("#ano").val();
    if ( ano =='' || isNaN(ano) || ano >=2022 || ano <= 0) {
        $("#ano").css('borderColor', 'red');
    } else {
        $("#ano").css('borderColor', 'green');
        
        
    }
});


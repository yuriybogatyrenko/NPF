$(document).ready(function(e){
    $(document).on('click', '.clear-input', function(e){
        e.preventDefault();
        $(this).siblings('input').val('');
    })

    if($('input[data-inputmask]').length > 0)
        $('input[data-inputmask]').mask('+7 (999) 999-99-99')

    if($('.select-box').length > 0)
    	$('.select-box').styler();

    $(document).on('change', '.js--check-all', function(e){
    	var value = $(this).prop('checked');
    	$(this).closest('form').find('input:checkbox').each(function(){
    		$(this).prop('checked', value)
    	})
    	// console.log('hi')
    	// e.preventDefault();
    });

    $(document).on('click', '.cotracts-table-group__section-header input[type="checkbox"]', function(e){
    	console.log($(this).prop('checked'))
        $(this).closest('.cotracts-table-group__section-header').siblings('.cotracts-table-group__section-hidden').find('input:checkbox').prop('checked', $(this).prop('checked'));
    });

    $(document).on('click', '.cotracts-table-group__section-header', function(e){
        if(!$(e.target).is(':checkbox')) {
            $(this).siblings('.hidden').slideToggle(200).end().toggleClass('active');
            e.preventDefault();
    	}
    });

    $(document).on('change', '.cotracts-table-group input:checkbox', function(e){
        setTimeout(function(){
    	   check_table_checkboxes($('.cotracts-table-group'))
        }, 100)
    	// e.preventDefault();
    });

    $('input:checkbox:not(.no-style)').each(function(e){
        if($(this).is(':checked'))
           $(this).wrap('<span class="checkbox active"></span>');
       else
    	   $(this).wrap('<span class="checkbox"></span>');
    	$(this).after('<span class="icon-checkbox"></span>');
    })

    $(document).on('change', 'input:checkbox:not(.no-style)', function(){
        var bl = $(this).closest('.checkbox');
        if($(this).is(":checked")) {
            bl.addClass('active');
        } else {
            bl.removeClass('active');
        }
    })

    $(document).on('click', '.b-attention__close', function(e){
        $(this).closest('.b-attention').slideUp(200)
        e.preventDefault();
    });

    if($('[data-datepicker]').length > 0) {
        var format = "dd.mm.yy";
        $('[data-datepicker]').datepicker();
        $('[data-datepicker]').datepicker("option", "dateFormat", format)
    }

    $(document).on('click', '.table--archive__group .b-user-profile__title', function(e){
        if(!$(this).hasClass('active')) {
            $(this).addClass('active');
            $(this).find('i.icon-arrow_down').addClass('active')
            $(this).closest('.table--archive__group').find('tr.hidden').show();
        } else {
            $(this).removeClass('active');
            $(this).find('i.icon-arrow_down').removeClass('active')
            $(this).closest('.table--archive__group').find('tr.hidden').hide();
        }
        
        e.preventDefault();
    });

    $(document).on('click', '[data-toggle-block]', function(e){
        var attr = $(this).attr('data-toggle-block');
        $('[data-toggle-hidden="'+attr+'"]').slideToggle(200);
        e.preventDefault();
    });

    $(document).on('click', '[data-call-reports-dropdown], .reports-dropdown__hidden-close', function(e){
        $('[data-reports-hidden-block="'+$(this).attr('data-reports-hidden-target')+'"]').toggle();
        $(this).closest('.reports-dropdown__hidden').hide();
        $('.person-listing-hidden').hide();
        e.preventDefault();
    });

    $(document).on('click', '[data-reports-checkboxes-collect]', function(e){
        var doc_numbers = [];
        $(this).closest('.reports-dropdown__hidden').find('input:checkbox:checked').each(function(){
            var num = $(this).closest('.tr').find('[data-report--number]').text();

            doc_numbers.push(num);
        })
        var nn = doc_numbers.join(", ");
        $('.reports-dropdown__current').text(nn);
        $(this).closest(".reports-dropdown__hidden").hide();
        e.preventDefault();
    });

    $(document).on('click', '[data-call-changefilial]', function(e){
        $('[data-reports-hidden-block="block-form-chose"]').hide();
        $('.reports-changefilial__hidden').show();
        e.preventDefault();
    });

    $(document).on('click', '.reports-changefilials__close', function(e){
        $('[data-reports-hidden-block="block-form-chose"]').show();
        $('.reports-changefilial__hidden').hide();
        e.preventDefault();
    });

    $(document).on('focus', '.person-search-input', function(e){
        $(this).next('.person-listing-hidden').show();
        $('.reports-changefilial__hidden, [data-reports-hidden-block]').hide();
        e.preventDefault();
    });

    $(document).on('click', '[data-collect-profile-checkboxes]', function(e){
        var checkboxes = [];
        $(this).closest('form').find('input:checkbox:checked').each(function(){
            var text = $(this).closest('.checkbox').next('.checkbox--name').text();
            checkboxes.push(text);
        });

        if(checkboxes.length > 0) {
            var final_text = checkboxes.join(', ')
            $(this).closest('.dropdown--checkboxes').siblings('.dropdown--selected__items').show().text('№'+final_text);
        } else {
            $(this).closest('.dropdown--checkboxes').siblings('.dropdown--selected__items').hide().text('');
        }

        $(this).closest('.dropdown--hidden').hide();
        e.preventDefault();
    });

    $(document).on('change', '.dropdown--checkboxes select', function(e){
        if($(this).find('option:selected').attr('data-call-checkboxes') == "true") {
            $(this).closest('.dropdown--checkboxes').find('.dropdown--hidden').show();
        } else if($(this).find('option:selected').attr('data-remove-checkboxes') == "true") {
            $(this).closest('.dropdown--checkboxes').next('.dropdown--selected__items').hide().text('');
        }
    })

    $(document).on('click', '.dropdown--selected__items', function(e){
        $(this).siblings('.dropdown--checkboxes').find('.dropdown--hidden').show();
        e.preventDefault();
    });

    $(document).on('click', '.b-header_company__dropdown-current', function(e){
        $(this).siblings('.b-header_company__dropdown-hidden').toggle();
        e.preventDefault();
    });

    $(document).on('click', '[data-table-link]', function(e){
        var bl = $(this).attr('data-table-link');
        $(this).siblings().removeClass('active').end().addClass('active');
        $('[data-table-toggle="'+bl+'"]').siblings('[data-table-toggle]').hide().end().show();
        e.preventDefault();
    });

    $(document).on('click', '[data-toggle-additional-filtler]', function(e){
        $('[data-additional-filter-contact-fund-hidden]').toggle();
        $(this).toggleClass('active');
        e.preventDefault();
    });

    $(document).on('click', '[data-checkbox-change-activity]', function(e){
        if(!$(e.target).is(":checkbox")) {
            if($(this).find(':checkbox').is(":checked"))
                $(this).find(':checkbox').prop('checked', false);
            else
                $(this).find(':checkbox').prop('checked', true);
            e.preventDefault();
        }
    });

    $(document).on('click', '[data-paste-person-name]', function(e){
        $(this).closest('.person-listing-hidden').hide().siblings('.person-search-input').val($(this).find('.td:first-child').text());

        e.preventDefault();
    });

    footer_pos();

    setTimeout(function(){
        footer_pos();
    }, 1000)

    $(window).resize(function(){
        footer_pos();
    })
})

function footer_pos() {
    var h = $('.b-footer').outerHeight();
    $('.page-wrapper').css({paddingBottom: h});
}

function check_table_checkboxes(bl) {
	bl.find('.contracts-table-group__item').each(function(){
		var count = $(this).find('.cotracts-table-group__section-hidden input:checkbox').length;
		var active = $(this).find('.cotracts-table-group__section-hidden input:checkbox:checked').length;

		if(count > active)
			$(this).find('.cotracts-table-group__section-header input:checkbox').prop('checked', false);
		else if(count == active)
			$(this).find('.cotracts-table-group__section-header input:checkbox').prop('checked', true);

		var count_par = $(this).find('.cotracts-table-group__section-header input:checkbox').length;
		var active_par = $(this).find('.cotracts-table-group__section-header input:checkbox:checked').length;

		if(count_par > active_par)
			$('.js--check-all').prop('checked', false);
		else if(count_par == active_par)
			$('.js--check-all').prop('checked', true);
	});
}
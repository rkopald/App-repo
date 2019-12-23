$(document).ready(function(){

  $("#submitBtn").click(function() {
    
    //alert('Submitted location: '+$('#location').val()+', start date: '+$('#start').val()+', end date: '+$('#end').val());
    var api_url = 'https://www.ncdc.noaa.gov/cdo-web/api/v2/data'
    //var api_url = 'https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&locationid=ZIP:97124&startdate=2019-12-01&enddate=2019-12-01'
    var api_token = 'MaHOOTUBeTLZBzFnhxhklnXzlimPzgvq'
    var location = 'ZIP:'+$('#location').val()

      $.ajax({
          url: api_url,
          headers: {token: api_token},
          data: {
            datasetid : 'GHCND',
            locationid: location,
            startdate: $('#start').val(),
            enddate: $('#end').val(),
            units: 'standard',
            limit: 1000
          },
      }).done(function(response){ 
        console.log(response)
        
        var dataTMAX = []

        $.each(response.results, function(i, v) {
          if(v.datatype == 'TMAX'){
            var d = new Date(v.date)
            dataTMAX.push([d.getTime(),v.value])
          }
        });
        console.log(dataTMAX)

        Highcharts.stockChart('chartContainer', {

          rangeSelector: {
              selected: 1
          },
  
          title: {
              text: 'Max Temperature for Location '+location
          },
  
          series: [{
              name: 'TMAX',
              data: dataTMAX,
              tooltip: {
                  valueDecimals: 2
              }
          }]
      });
    });
  });

  $('#datepicker').datepicker({
    format: "yyyy-mm-dd",
    startView: 1
  });

});

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    <link rel="stylesheet" href="main.css">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
</head>

  <body>

    <nav class="navbar navbar-dark" style="background-color: #649f84;">
        <div class="container">
          <a href="#" class="navbar-brand">Mood Analyser</a>
        </div>
    </nav>

        <div class="col-sm-12 jumbotron-fluid shadow">
          <div class="jumbotron page-banner-mood">
            <div class="headertxt col-md-6 col-sm-6">
              <h1>Mood Analyser</h1>
              <p>Analyse your mood by answering these questions </p>
          </div>  
        </div>
        </div>

      <div class="container">
        <div class="row">
          <div class="col-sm-12 jumbotron-fluid border shadow" style="padding: 20px; margin-top: 25px;">
            <h5><strong>Select how you feel today and click 'Analyse Mood'!</strong></h5><br><br>

            <form action="" id="moodForm" method="POST">
              <div class="col-lg-6 col-md-6 float-left">
                <div class="selext-box">
                  <p><strong>Today's most extreme depressed mood</strong></p>
                  <select id="depressRate" class="custom-select" form="moodForm" name="depression" value="severe">
                    <option value="Severe">Severe</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Mild">Mild</option>
                    <option value="None">None</option>
                  </select>
                </div>
              </div>
              
              <div class="col-lg-6 col-md-6 float-right">
                <div class="selext-box">
                  <p><strong>Today's most extreme elevated mood</strong></p>
                  <select id="elevatedRate" class="custom-select" form="moodForm" name="elevated" value="severe">
                    <option value="Severe">Severe</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Mild">Mild</option>
                    <option value="None">None</option>
                  </select>
                </div>
              </div>
              <div class="clearfix"></div>

              <div class="col-lg-6 col-md-6 float-left">
                <div class="selext-box">
                  <p><strong>Today's most extreme anxiety</strong></p>
                  <select id="anxietyRate" class="custom-select" form="moodForm" name="anxiety" value="severe">
                    <option value="Severe">Severe</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Mild">Mild</option>
                    <option value="None">None</option>
                  </select>
                </div>
              </div>
              
              <div class="col-lg-6 col-md-6 float-right">
                <div class="selext-box">
                  <p><strong>Today's most extreme irritability</strong></p>
                  <select id="irritateRate" class="custom-select" name="irritability" value="severe">
                    <option value="Severe">Severe</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Mild">Mild</option>
                    <option value="None">None</option>
                  </select>
                </div>
              </div>
 
              <input type="submit" name="save">
              <button type="submit" name="save" class="add-btn btn btn-success float-right" data-toggle="modal" data-target="#exampleModalCenter">Analyse Mood</button>
              <button type="button" name="delete" class="delete-btn btn btn-danger float-right">Delete</button>
              <button type="button" class="back-btn btn btn-secondary float-right">Back</button>
              <div class="clearfix"></div>
            </form>

            
            
            <!-- Modal -->
          <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">Your mood analysis today: </h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <!--Message-->
                  <span class="center">Message: <span class="message">Your analysis message will appear when you start analysing your mood</span></span>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
            <div class="container" style="margin-top: 10%;">
              
              <!--Item List-->
              <ul class="list-group" id="item-list">
                <!--<li class="list-group-item" id="item-0"><strong>Mood: </strong> 
                  <em>
                    Happy
                  </em>
                  <small class="badge text-muted">
                    <a href="#" class=""><i class="fa fa-pencil"></i></a>
                  </small>
              </li>

              <li class="collection-item" id="item-0"><strong>Mood: </strong> 
                <em>
                  Sad
                </em>
                <small class="text-muted">
                  <a href="#" class=""><i class="fa fa-pencil"></i></a>
                </small>
            </li>-->

            </ul>
          
              <br>
            </div>
              
          </div>

      </div>

    <script
    src="https://code.jquery.com/jquery-3.5.1.min.js"
    integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
    crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.bundle.min.js" integrity="sha384-LtrjvnR4Twt/qOuYxE721u19sVFLVSA4hf/rRt6PrZTmiPltdZcI7q7PXQBYTKyf" crossorigin="anonymous"></script>
    <script src="mood.js"></script>
    <?php include 'connection.php';?>
    </body>
</html>
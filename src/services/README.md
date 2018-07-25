Чтобы запустить сервис, необходимо установить зависимости через pip.

`pip install -r requirements.txt`

На рабочей машине нужен Postgres. В Postgres'е необходимо создать
пустую БД kto_tickets
Из командной строки:
> $ cd kto-tickets\src\services\bl

> $ add_app_to_env.bat

Запустить:
> $ flask db upgrade

> $ flask init-data

После выполнения этих шагов, запустить один из файлов run_api, в 
зависимости от операционной системы.
Сервис будет доступен по адресу http://127.0.0.1:5000/

<h3>API:</h3>
Секции помеченные WIP - находятся в разработке
<h4>Атворизация</h4>
Сейчас все методы доступны без авторизации.
    
    /auth - группа методов отвечающая за авторизацию и аутентификацию
    /auth/login - получить токен по логину и паролю
    /auth/logout - выйти из системы


<h4>События [WIP]</h4>
Список событий:
<code>

    URL: /events/
    Method: "POST"
    Request:
    {"params":
        {
            "navigation": {
                "page": "0",
                "page_size": "5"
            },
            "filters": {
                "date_from": "2015-12-01",
                "date_to":	"2018-06-26"
            },
            "sorting": [["visible_title", "desc"], ["event_id", "desc"]]
        }
    }
    
</code>


<h4>Мероприятия</h4>
Список мероприятий:

    "url": /performances,
    method: 'POST',
    request: {
        "filters": {
            "page": "0",
            "page_size": "5",
            "order_by": [["title", "desc"], ["performance_id", "asc"]]
        }
    }

Добавить мероприятие:

    "url": /performances,
    method: 'POST',
    JSON: {
	    "title": "New 112312323",
	    "description": "Doasdasdasdasdteger aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci.",
	    "duration": "3600",  // seconds
	    "age_rating": "3",
	    "genres":["5", "6"],
	    "audiences":["2", "3"]
	}


Получить информацию по мероприятию:
    
    "url": /performances/id,
    method: 'GET',
    response: 
        {
            
        }

Получить информацию по мероприятию:
    
    "url": /performances/id,
    method: 'GET',
    response: 
        {
        
        }
        
Удалить мероприятие:

    url: /performances/id
    method: 'DELETE'

Обновить мероприятие:

    url: /performances/id
    method: 'PUT'
    request: {
        "title": "New performance title",
	    "description": "new description",
	    "duration": "7200",  // second 
	    "age_rating": "1",
	    "genres":["1", "2"],
	    "audiences":["3", "4"]
        }


<h4>Возратсные рейтинги</h4>
Справочная таблица возростных ограничений

    url: /age_ratings/
    method: 'POST'
    request data: {"list": true}
   
Прочитать запись:

    url: /age_ratings/id
    method: 'GET'

Удалить запись:

    url: /age_ratings/id
    method: 'DELETE'

Обновить запись:

    url: /age_ratings/id
    method: 'PUT'
    request: {
        "name": "some new name",
        "description": "or some new description"
        }

Добавить новую запись:

    url: /age_ratings
    method: 'POST'
    request: {
        "name": "some new name",
        "description": "or some new description"
        }

<h4>Жанры(WIP)</h4>
Справочная таблица жанров

    url: /genres
    method: 'POST'
    request: {"list": true}
   
Прочитать запись:

    url: /genres/id
    method: 'GET'

Удалить запись:

    url: /genres/id
    method: 'DELETE'

Обновить запись:

    url: /genres/id
    method: 'PUT'
    request: {
        "name": "some new name",
        "description": "or some new description"
        }

Добавить новую запись:

    url: /genres
    method: 'POST'
    request: {
        "name": "some new name",
        "description": "or some new description"
        }


<h4>Зрительские аудитории(WIP)</h4>
Справочная таблица аудиторий

    url: /audiences
    method: 'POST'
    request: {"list": true}
   
Прочитать запись:

    url: /audiences/id
    method: 'GET'

Удалить запись:

    url: /audiences/id
    method: 'DELETE'

Обновить запись:

    url: /audiences/id
    method: 'PUT'
    request: {
        "name": "some new name",
        "description": "or some new description"
        }

Добавить новую запись:

    url: /audiences
    method: 'POST'
    request: {
        "name": "some new name",
        "description": "or some new description"
        }

<h4>Залы проведения мероприятий</h4>
Добавить новую запись:

    url: /halls/
    method: 'POST'
    request: {
      "name": "Центральный зал",
      "number": "001",
      "width": 15,
      "height": 12,
      "hall_scheme": [
        ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        ["0", "0", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "0", "0"],
        ["0", "0", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "0", "0"],
        ["0", "0", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        ["1", "1", "1", "1", "0", "1", "1", "1", "1", "1", "0", "1", "1", "1", "1"],
        ["1", "1", "1", "1", "0", "1", "1", "1", "1", "1", "0", "1", "1", "1", "1"],
        ["1", "1", "1", "1", "0", "1", "1", "1", "1", "1", "0", "1", "1", "1", "1"],
        ["1", "1", "1", "1", "0", "1", "1", "1", "1", "1", "0", "1", "1", "1", "1"],
        ["1", "1", "1", "1", "0", "1", "1", "1", "1", "1", "0", "1", "1", "1", "1"],
        ["1", "1", "1", "1", "0", "1", "1", "1", "1", "1", "0", "1", "1", "1", "1"],
        ["1", "1", "1", "1", "0", "1", "1", "1", "1", "1", "0", "1", "1", "1", "1"]
      ],
      "disabled": false,
      "disable_reason": ""
    }

Cписок залов:

    url: /halls/
    method: 'POST'
    request: {
      "filters": {
        "page": "0",
        "page_size": "5"
        "order_by": [
            ['field', 'asc'],
            ['field', 'desc']
        ]
      }
    }

Получить информацию о зале:

    url: /halls/<hall_id>
    method: 'GET'

Удалить зал:

    url: /halls/<hall_id>
    method: 'DELETE'

Обновить информацию о зале(любые поля как при создании, но необходим идентификатор зала):

    url: /halls/<hall_id>
    method: 'PUT'
    {
      "hall_id": int,
      "disabled": true,
      "disable_reason": "Закрыт на ремонт"
    }

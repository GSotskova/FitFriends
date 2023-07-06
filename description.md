# FitFriends
FitFriends

Запуск приложения:
nx run users:serve (Пользователи: регистрация, авторизация, просмотр, друзья и т.д.)
nx run training:serve (Тренировки, заказы, заявки на персональные/совместные, комментарии)
nx run uploader:serve (Загрузка файлов: аватар, сертификаты и т.д.)
nx run notify:serve (Оповещения)
nx run bff:serve (Все запросы)
nx run seed:serve (Первоначальное заполнение БД)

docker
docker compose --file ./apps/users/docker-compose.dev.yml --project-name "fitfriends-users" up -d
docker compose --file ./apps/uploader/docker-compose.dev.yml --project-name "fitfriends-uploader" up -d
docker compose --file ./apps/notify/docker-compose.dev.yml --project-name "fitfriends-notify" up -d
docker compose --file ./apps/training/docker-compose.dev.yml --project-name "fitfriends-training" up -d


Заполнение БД:
    каталог seed:
            - seed.http (заполняются таблицы users, questionnairesCoach, questionnairesUser в бд fitfriends-users
                         заполняются таблицу training в бд fitfriends-training
                         заполняются таблицу comments в бд fitfriends-training)

Сценарии (каталог bff =>bff.http):
1. Пользователи (регистрации - 2 примера (пользователь и тренер))
2. Личный кабинет пользователя 
3. Личный кабинет тренера
4. Каталог тренировок и комментарии
                
Спецификация:
user  http://localhost:3333/spec
training http://localhost:3334/spec
specification.drawio
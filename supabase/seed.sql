SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.7 (Ubuntu 15.7-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', 'd4a345a8-1de8-432a-8f1c-d8477685939c', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"william.marzella@evotix.com","user_id":"393ae5c7-ab6b-450f-b0dd-6bc329750896","user_phone":""}}', '2024-09-14 01:24:44.172598+00', ''),
	('00000000-0000-0000-0000-000000000000', '5799795a-4df4-48dd-9997-8c7d179f091a', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"william.marzella@evotix.com","user_id":"e8da08f6-6f16-4832-b78a-e1dcf965c43d","user_phone":""}}', '2024-09-14 01:44:46.641707+00', ''),
	('00000000-0000-0000-0000-000000000000', '514bcf42-5137-4b91-b608-fda556535589', '{"action":"login","actor_id":"e8da08f6-6f16-4832-b78a-e1dcf965c43d","actor_username":"william.marzella@evotix.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-09-14 02:04:34.318778+00', ''),
	('00000000-0000-0000-0000-000000000000', '5091344d-3ef8-47d5-a448-80d504dec583', '{"action":"login","actor_id":"e8da08f6-6f16-4832-b78a-e1dcf965c43d","actor_username":"william.marzella@evotix.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-09-14 02:06:13.062291+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cb13f7db-7b5a-41a5-b9b2-0366af63d4fe', '{"action":"login","actor_id":"e8da08f6-6f16-4832-b78a-e1dcf965c43d","actor_username":"william.marzella@evotix.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-09-14 02:06:46.194134+00', ''),
	('00000000-0000-0000-0000-000000000000', 'db90173e-5296-42b3-8c31-fcc04179e490', '{"action":"token_refreshed","actor_id":"e8da08f6-6f16-4832-b78a-e1dcf965c43d","actor_username":"william.marzella@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-14 05:45:54.227066+00', ''),
	('00000000-0000-0000-0000-000000000000', '005f2599-a34c-424a-ac79-0bc5f5070495', '{"action":"token_revoked","actor_id":"e8da08f6-6f16-4832-b78a-e1dcf965c43d","actor_username":"william.marzella@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-14 05:45:54.227785+00', ''),
	('00000000-0000-0000-0000-000000000000', '8c8bbf13-53a9-4dc5-b666-fd90b67a5cb6', '{"action":"token_refreshed","actor_id":"e8da08f6-6f16-4832-b78a-e1dcf965c43d","actor_username":"william.marzella@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-14 05:45:55.31794+00', ''),
	('00000000-0000-0000-0000-000000000000', '8d5d0c44-571b-45aa-8951-44ef248fdc6b', '{"action":"login","actor_id":"e8da08f6-6f16-4832-b78a-e1dcf965c43d","actor_username":"william.marzella@evotix.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-09-14 05:46:45.371683+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e1ce98b3-b610-406d-9801-a38f1601ac9d', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"will.worsley@evotix.com","user_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","user_phone":""}}', '2024-09-14 06:15:30.055247+00', ''),
	('00000000-0000-0000-0000-000000000000', '2c120414-08d2-4993-b444-e6bcbc3f8fea', '{"action":"logout","actor_id":"e8da08f6-6f16-4832-b78a-e1dcf965c43d","actor_username":"william.marzella@evotix.com","actor_via_sso":false,"log_type":"account"}', '2024-09-14 06:18:58.29295+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b2aa9058-7732-4657-bf7b-215330f28139', '{"action":"login","actor_id":"e8da08f6-6f16-4832-b78a-e1dcf965c43d","actor_username":"william.marzella@evotix.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-09-14 06:34:00.051877+00', ''),
	('00000000-0000-0000-0000-000000000000', '912d4687-db1c-4754-9cac-88dfca21b686', '{"action":"logout","actor_id":"e8da08f6-6f16-4832-b78a-e1dcf965c43d","actor_username":"william.marzella@evotix.com","actor_via_sso":false,"log_type":"account"}', '2024-09-14 06:34:06.407276+00', ''),
	('00000000-0000-0000-0000-000000000000', '723bcdcf-f56f-400b-9cc7-d22d0256710e', '{"action":"login","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-09-14 06:42:48.197593+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e07a3fb1-018f-4a64-a4b9-745c094f953c', '{"action":"logout","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"account"}', '2024-09-14 06:43:46.644292+00', ''),
	('00000000-0000-0000-0000-000000000000', '505f89e7-a7c5-455f-8bc7-3641182a7a2f', '{"action":"login","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-09-14 06:51:45.279187+00', ''),
	('00000000-0000-0000-0000-000000000000', '19602bb0-0fc0-45b2-b732-06a0cc2acef5', '{"action":"logout","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"account"}', '2024-09-14 06:51:50.384243+00', ''),
	('00000000-0000-0000-0000-000000000000', '74fb309e-13fa-44bc-a242-a7e80770dd9e', '{"action":"login","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-09-14 06:52:00.148608+00', ''),
	('00000000-0000-0000-0000-000000000000', '4a78d251-14d1-4dc4-a428-14d45629492b', '{"action":"token_refreshed","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-14 08:46:05.709395+00', ''),
	('00000000-0000-0000-0000-000000000000', '5e108651-4563-452f-8c67-43518e64159d', '{"action":"token_revoked","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-14 08:46:05.710401+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bea8cb5d-044c-4fb1-b2d6-610582abc597', '{"action":"token_refreshed","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-14 12:02:03.563677+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a70bb4d3-2784-4a48-a191-9d1c94d95f0b', '{"action":"token_revoked","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-14 12:02:03.566516+00', ''),
	('00000000-0000-0000-0000-000000000000', '84c8b81d-2fcc-434f-9191-0cbf3028862b', '{"action":"token_refreshed","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-14 12:02:03.59913+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd02733c6-d9ef-47f3-b5d7-70caeef98a6d', '{"action":"token_refreshed","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-14 12:02:03.60462+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f97a122c-71f5-47b8-8e79-da61ad4d73f5', '{"action":"token_refreshed","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-14 12:02:03.668561+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f5ac3e77-00e7-463b-98e3-3e23bb4a7168', '{"action":"token_refreshed","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-14 12:02:04.578641+00', ''),
	('00000000-0000-0000-0000-000000000000', '8eb1861e-d04b-4b24-a807-62d9f2ddfa0c', '{"action":"token_refreshed","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-14 12:02:07.165433+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ab5ec430-b935-45dc-9905-425270461429', '{"action":"logout","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"account"}', '2024-09-14 12:54:27.545959+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fcd09d9a-a9ba-47e0-ad82-d78d24b49a3e', '{"action":"login","actor_id":"e8da08f6-6f16-4832-b78a-e1dcf965c43d","actor_username":"william.marzella@evotix.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-09-14 12:54:34.682513+00', ''),
	('00000000-0000-0000-0000-000000000000', '5884032e-d132-4d75-bea0-db2fc4b72cae', '{"action":"logout","actor_id":"e8da08f6-6f16-4832-b78a-e1dcf965c43d","actor_username":"william.marzella@evotix.com","actor_via_sso":false,"log_type":"account"}', '2024-09-14 12:54:50.249791+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b3efbe28-cd36-495f-b488-9deb6815adad', '{"action":"login","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-09-14 12:54:53.826694+00', ''),
	('00000000-0000-0000-0000-000000000000', '73a6230c-13a7-4dec-a23f-e5f89b803675', '{"action":"token_refreshed","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-14 13:53:07.571647+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd72f5976-8ba0-482a-8501-66d388d97bb7', '{"action":"token_revoked","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-14 13:53:07.572659+00', ''),
	('00000000-0000-0000-0000-000000000000', '8a8e4c26-2f64-4abe-8e86-df9a7fe24fcc', '{"action":"token_refreshed","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-15 01:23:08.776918+00', ''),
	('00000000-0000-0000-0000-000000000000', '5efa8080-e8de-41cf-a6c3-5e3eb9067b45', '{"action":"token_revoked","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-15 01:23:08.77971+00', ''),
	('00000000-0000-0000-0000-000000000000', '6835d702-d892-445e-ac1c-d8fc98cdb0ac', '{"action":"token_refreshed","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-15 02:22:23.055465+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e255543c-e623-40ce-8bea-059fff5ee956', '{"action":"token_revoked","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-15 02:22:23.056825+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f712765f-563f-4c1a-a6d7-0ad369017c69', '{"action":"token_refreshed","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-15 05:18:46.182857+00', ''),
	('00000000-0000-0000-0000-000000000000', '4910b606-45f3-4812-bb3b-96cdb4b2bf66', '{"action":"token_revoked","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-15 05:18:46.184187+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e127b8e2-0ff3-4a56-b42a-6efdc411744c', '{"action":"token_refreshed","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-15 06:16:48.458051+00', ''),
	('00000000-0000-0000-0000-000000000000', '2f18b9d8-516a-4bab-98ea-36e333734fd0', '{"action":"token_revoked","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-15 06:16:48.45964+00', ''),
	('00000000-0000-0000-0000-000000000000', 'abbfb0a8-b068-4bbe-af80-b6da1a44198e', '{"action":"logout","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"account"}', '2024-09-15 07:06:02.948129+00', ''),
	('00000000-0000-0000-0000-000000000000', '3a69829f-7c28-4e91-97ba-d28f46ec21e4', '{"action":"login","actor_id":"e8da08f6-6f16-4832-b78a-e1dcf965c43d","actor_username":"william.marzella@evotix.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-09-15 07:06:09.241857+00', ''),
	('00000000-0000-0000-0000-000000000000', '4acd1d97-0322-442d-ac2c-a1654ec993ef', '{"action":"token_refreshed","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-15 03:22:31.713277+00', ''),
	('00000000-0000-0000-0000-000000000000', '08055cbb-5962-4934-bcb4-04de44954e93', '{"action":"token_revoked","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-15 03:22:31.714216+00', ''),
	('00000000-0000-0000-0000-000000000000', '537bf792-7a8a-44e4-b97b-f11d9fbcfcdd', '{"action":"token_refreshed","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-15 03:22:31.755539+00', ''),
	('00000000-0000-0000-0000-000000000000', '1f075caf-87df-49da-841b-e3c5334a88c7', '{"action":"token_refreshed","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-15 03:22:31.773117+00', ''),
	('00000000-0000-0000-0000-000000000000', '66072b68-aa93-42a4-914d-5f024da2fedb', '{"action":"token_refreshed","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-15 03:22:31.783877+00', ''),
	('00000000-0000-0000-0000-000000000000', '6d0747cc-a64a-4ce4-9e54-671956aa4f0d', '{"action":"token_refreshed","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-15 03:22:32.250229+00', ''),
	('00000000-0000-0000-0000-000000000000', '87821ce1-8dd1-4dd7-925c-4247090805cf', '{"action":"token_refreshed","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-15 04:20:36.361394+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c8540460-3c41-4bc2-b31e-46059d712fa7', '{"action":"token_revoked","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-15 04:20:36.362188+00', ''),
	('00000000-0000-0000-0000-000000000000', '44d74629-db49-49fa-95a1-1b4c2996e426', '{"action":"token_refreshed","actor_id":"e8da08f6-6f16-4832-b78a-e1dcf965c43d","actor_username":"william.marzella@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-15 08:04:34.374653+00', ''),
	('00000000-0000-0000-0000-000000000000', '015f4d04-641f-4d91-a44a-bb09b910510b', '{"action":"token_revoked","actor_id":"e8da08f6-6f16-4832-b78a-e1dcf965c43d","actor_username":"william.marzella@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-15 08:04:34.37585+00', ''),
	('00000000-0000-0000-0000-000000000000', '0c8e2956-ff2e-4160-83d0-f59a9996ad9a', '{"action":"logout","actor_id":"e8da08f6-6f16-4832-b78a-e1dcf965c43d","actor_username":"william.marzella@evotix.com","actor_via_sso":false,"log_type":"account"}', '2024-09-15 08:15:36.675067+00', ''),
	('00000000-0000-0000-0000-000000000000', '653cff7f-9d92-4cd1-8600-520024b17605', '{"action":"login","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-09-15 08:18:00.026304+00', ''),
	('00000000-0000-0000-0000-000000000000', '2306e277-9755-4580-be26-dc776ecd2314', '{"action":"logout","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"account"}', '2024-09-15 09:13:59.713405+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b1d9355d-9893-4908-a6b4-2325d93a7cc3', '{"action":"login","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-09-15 09:18:59.266011+00', ''),
	('00000000-0000-0000-0000-000000000000', '5742c75e-5001-4edd-afc8-00dd2c72fc41', '{"action":"token_refreshed","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-15 10:44:59.212063+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a66378e2-74c4-428c-8318-ab8d6e9e6c32', '{"action":"token_revoked","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-15 10:44:59.213575+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c8eff86f-6503-43a5-aa40-a809c761ebfc', '{"action":"token_refreshed","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-15 11:51:14.348808+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c24b534e-abff-4367-a13a-95b6ba1446bb', '{"action":"token_revoked","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-15 11:51:14.349519+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ec130137-8748-4d1a-ba61-9c20de07c337', '{"action":"token_refreshed","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-15 23:27:35.791565+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e58d5301-7836-406b-bfcf-fc759b7d350f', '{"action":"token_revoked","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-15 23:27:35.796394+00', ''),
	('00000000-0000-0000-0000-000000000000', '56b89daf-1508-450f-9791-25a2072e9de7', '{"action":"logout","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"account"}', '2024-09-15 23:28:05.946394+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd22a32b5-9c38-4a96-a9d9-83fde58c4045', '{"action":"login","actor_id":"e8da08f6-6f16-4832-b78a-e1dcf965c43d","actor_username":"william.marzella@evotix.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-09-15 23:28:10.270665+00', ''),
	('00000000-0000-0000-0000-000000000000', '8605b24a-1102-49ec-afb4-b4f76f21bc23', '{"action":"logout","actor_id":"e8da08f6-6f16-4832-b78a-e1dcf965c43d","actor_username":"william.marzella@evotix.com","actor_via_sso":false,"log_type":"account"}', '2024-09-16 00:00:21.262586+00', ''),
	('00000000-0000-0000-0000-000000000000', 'db9d1b85-1861-48e2-b26e-eba4e9aeb601', '{"action":"login","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2024-09-16 00:01:03.071901+00', ''),
	('00000000-0000-0000-0000-000000000000', '1767420a-03d4-4750-a858-fd84aa65c748', '{"action":"token_refreshed","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-16 00:59:20.569408+00', ''),
	('00000000-0000-0000-0000-000000000000', '34de969a-9a3e-49c4-835f-29f4e49a3af6', '{"action":"token_revoked","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-16 00:59:20.570295+00', ''),
	('00000000-0000-0000-0000-000000000000', '534b72d0-35f6-47b6-84ef-4aabcfe6c603', '{"action":"token_refreshed","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-16 01:57:22.312603+00', ''),
	('00000000-0000-0000-0000-000000000000', '39fc342b-5a1b-4b8f-b43a-7e30ae76e09e', '{"action":"token_revoked","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-16 01:57:22.313794+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd387fe4b-ba7e-449c-a09b-02f133512df7', '{"action":"token_refreshed","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-16 02:55:23.026321+00', ''),
	('00000000-0000-0000-0000-000000000000', '14df652a-ea35-4fa7-af6c-f66bb01583ea', '{"action":"token_revoked","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-16 02:55:23.028259+00', ''),
	('00000000-0000-0000-0000-000000000000', '293d5788-4a21-4bb7-b6f5-54a986994b6d', '{"action":"token_refreshed","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-16 03:53:31.389078+00', ''),
	('00000000-0000-0000-0000-000000000000', '5b22c977-5258-4490-847e-183d9c3cc56e', '{"action":"token_revoked","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-16 03:53:31.390332+00', ''),
	('00000000-0000-0000-0000-000000000000', '1321dec5-18db-4f7e-81e8-a78a7e9ed9b7', '{"action":"token_refreshed","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-16 06:28:53.384626+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f5a7a306-079b-4fb8-ace0-e9c737bb4075', '{"action":"token_revoked","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-16 06:28:53.385565+00', ''),
	('00000000-0000-0000-0000-000000000000', '8da507cb-433f-4125-ab56-876c654556c2', '{"action":"token_refreshed","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-16 06:28:53.40791+00', ''),
	('00000000-0000-0000-0000-000000000000', '5a3afe7c-4c69-458d-8b0c-144beec557fd', '{"action":"token_refreshed","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-16 06:28:57.744249+00', ''),
	('00000000-0000-0000-0000-000000000000', '66f9fa65-28a6-4bdf-9edc-37957ca2627b', '{"action":"token_refreshed","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-16 06:28:59.570934+00', ''),
	('00000000-0000-0000-0000-000000000000', '6e0fa773-4c28-4a0f-8ffd-7bd5a658194f', '{"action":"token_refreshed","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-16 06:28:59.810365+00', ''),
	('00000000-0000-0000-0000-000000000000', '1d3261e3-3924-40ea-9bb1-97f31afe3629', '{"action":"token_refreshed","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-16 11:12:03.301756+00', ''),
	('00000000-0000-0000-0000-000000000000', '224d1970-dbac-4bcb-85f5-e869612e5298', '{"action":"token_revoked","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-16 11:12:03.303697+00', ''),
	('00000000-0000-0000-0000-000000000000', '78f8629b-b2f6-4aa2-9af5-b78f53bf1732', '{"action":"token_refreshed","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-16 12:11:36.58323+00', ''),
	('00000000-0000-0000-0000-000000000000', '454841d3-f773-49cb-8541-56d2bc174547', '{"action":"token_revoked","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-16 12:11:36.584539+00', ''),
	('00000000-0000-0000-0000-000000000000', '0a0d2ef5-8050-46ea-8fa6-f1cbf0c96175', '{"action":"token_refreshed","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-16 21:49:08.168343+00', ''),
	('00000000-0000-0000-0000-000000000000', '13e30367-1d0b-4d22-987d-196494988d54', '{"action":"token_revoked","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-16 21:49:08.169937+00', ''),
	('00000000-0000-0000-0000-000000000000', '685d58b8-59d6-4632-9de1-115dca1ad1c5', '{"action":"token_refreshed","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-16 23:45:27.60536+00', ''),
	('00000000-0000-0000-0000-000000000000', '7d25e826-047e-45cb-8e6a-4c8c1e46feeb', '{"action":"token_revoked","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-16 23:45:27.607092+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd76b18da-6e62-4977-baa4-1d9e03cb43d6', '{"action":"token_refreshed","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-17 00:43:51.720006+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f8e67bd1-1dd9-4cc6-a250-096ccf2827e4', '{"action":"token_revoked","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-17 00:43:51.721082+00', ''),
	('00000000-0000-0000-0000-000000000000', '51ace4eb-5cf6-4f45-82b0-848841d5889a', '{"action":"token_refreshed","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-16 06:28:59.815133+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a9077655-4287-4c6b-ac4e-4aa0d5ec2d83', '{"action":"token_refreshed","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-16 06:29:00.815397+00', ''),
	('00000000-0000-0000-0000-000000000000', '982ddee7-abf1-44b7-9379-72c0f56c6303', '{"action":"token_refreshed","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-16 06:29:00.822805+00', ''),
	('00000000-0000-0000-0000-000000000000', '3687bad5-0fba-4092-84e5-61d644ad74f0', '{"action":"token_refreshed","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-16 06:29:01.776169+00', ''),
	('00000000-0000-0000-0000-000000000000', '8ba5c950-1b44-4eb1-ba81-863c994fb923', '{"action":"token_refreshed","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-16 10:12:47.195165+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ec6edcc4-7ac9-4925-86fe-b39b80f52bfe', '{"action":"token_revoked","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-16 10:12:47.196198+00', ''),
	('00000000-0000-0000-0000-000000000000', '5a1aa26f-c836-43fa-9105-eef548fdc830', '{"action":"token_refreshed","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-16 22:47:24.835703+00', ''),
	('00000000-0000-0000-0000-000000000000', '7cb6024a-7871-439d-abdd-4b950dfc456e', '{"action":"token_revoked","actor_id":"2192b2c8-c3e6-4a58-82f1-782d3a1091c4","actor_username":"will.worsley@evotix.com","actor_via_sso":false,"log_type":"token"}', '2024-09-16 22:47:24.836921+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', '2192b2c8-c3e6-4a58-82f1-782d3a1091c4', 'authenticated', 'authenticated', 'will.worsley@evotix.com', '$2a$10$BQvZ2GYD5Yu1D5Vfh.AK5.jrI8S7hNaa4zE.iHcjviBHh6Z8Pjy42', '2024-09-14 06:15:30.056082+00', NULL, '', NULL, '', NULL, '', '', NULL, '2024-09-16 00:01:03.072681+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2024-09-14 06:15:30.053176+00', '2024-09-17 00:43:51.723106+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'e8da08f6-6f16-4832-b78a-e1dcf965c43d', 'authenticated', 'authenticated', 'william.marzella@evotix.com', '$2a$10$BwnmRhbnNeETWXkP6ibw9.XOFaDigfl9J7XJBMoS3upJ5dLJPUTbi', '2024-09-14 01:44:46.642621+00', NULL, '', NULL, '', NULL, '', '', NULL, '2024-09-15 23:28:10.271192+00', '{"provider": "email", "providers": ["email"]}', '{}', NULL, '2024-09-14 01:44:46.639588+00', '2024-09-15 23:28:10.272323+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('e8da08f6-6f16-4832-b78a-e1dcf965c43d', 'e8da08f6-6f16-4832-b78a-e1dcf965c43d', '{"sub": "e8da08f6-6f16-4832-b78a-e1dcf965c43d", "email": "william.marzella@evotix.com", "email_verified": false, "phone_verified": false}', 'email', '2024-09-14 01:44:46.640761+00', '2024-09-14 01:44:46.640792+00', '2024-09-14 01:44:46.640792+00', 'c90c13f5-7d4b-4ec2-8b99-065d4995f22d'),
	('2192b2c8-c3e6-4a58-82f1-782d3a1091c4', '2192b2c8-c3e6-4a58-82f1-782d3a1091c4', '{"sub": "2192b2c8-c3e6-4a58-82f1-782d3a1091c4", "email": "will.worsley@evotix.com", "email_verified": false, "phone_verified": false}', 'email', '2024-09-14 06:15:30.054386+00', '2024-09-14 06:15:30.054415+00', '2024-09-14 06:15:30.054415+00', 'd95ca591-f4e5-405f-b202-91fb8fc795b2');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag") VALUES
	('21db33a2-ee91-4a17-9c8b-2f284e12d82c', '2192b2c8-c3e6-4a58-82f1-782d3a1091c4', '2024-09-16 00:01:03.072768+00', '2024-09-17 00:43:51.724007+00', NULL, 'aal1', NULL, '2024-09-17 00:43:51.723942', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36', '192.168.65.1', NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('21db33a2-ee91-4a17-9c8b-2f284e12d82c', '2024-09-16 00:01:03.074901+00', '2024-09-16 00:01:03.074901+00', 'password', 'af6f65ec-f864-4c5c-984a-148521529fb0');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 38, 'pfK7S7-J6dPd_jIngZYHtQ', '2192b2c8-c3e6-4a58-82f1-782d3a1091c4', true, '2024-09-16 21:49:08.171766+00', '2024-09-16 22:47:24.837358+00', 'xJ-jrT8HGrU7e-hDVav-Kg', '21db33a2-ee91-4a17-9c8b-2f284e12d82c'),
	('00000000-0000-0000-0000-000000000000', 39, 'tWQ3MniwhgNstuI2QrLHog', '2192b2c8-c3e6-4a58-82f1-782d3a1091c4', true, '2024-09-16 22:47:24.838269+00', '2024-09-16 23:45:27.607989+00', 'pfK7S7-J6dPd_jIngZYHtQ', '21db33a2-ee91-4a17-9c8b-2f284e12d82c'),
	('00000000-0000-0000-0000-000000000000', 40, 'vDUt1q9Wk3OQDfrk8goCIA', '2192b2c8-c3e6-4a58-82f1-782d3a1091c4', true, '2024-09-16 23:45:27.609191+00', '2024-09-17 00:43:51.72159+00', 'tWQ3MniwhgNstuI2QrLHog', '21db33a2-ee91-4a17-9c8b-2f284e12d82c'),
	('00000000-0000-0000-0000-000000000000', 41, 'CskZX2e24ngcp9X5I9-zfQ', '2192b2c8-c3e6-4a58-82f1-782d3a1091c4', false, '2024-09-17 00:43:51.722193+00', '2024-09-17 00:43:51.722193+00', 'vDUt1q9Wk3OQDfrk8goCIA', '21db33a2-ee91-4a17-9c8b-2f284e12d82c'),
	('00000000-0000-0000-0000-000000000000', 29, 'g4waFO3L9-PKDPDBqvAU8A', '2192b2c8-c3e6-4a58-82f1-782d3a1091c4', true, '2024-09-16 00:01:03.073625+00', '2024-09-16 00:59:20.570649+00', NULL, '21db33a2-ee91-4a17-9c8b-2f284e12d82c'),
	('00000000-0000-0000-0000-000000000000', 30, 'BMTQpGhtazU_W1BU-WEnoQ', '2192b2c8-c3e6-4a58-82f1-782d3a1091c4', true, '2024-09-16 00:59:20.571202+00', '2024-09-16 01:57:22.314371+00', 'g4waFO3L9-PKDPDBqvAU8A', '21db33a2-ee91-4a17-9c8b-2f284e12d82c'),
	('00000000-0000-0000-0000-000000000000', 31, 'wxSC-KNXD4Ynh7E7slXeeg', '2192b2c8-c3e6-4a58-82f1-782d3a1091c4', true, '2024-09-16 01:57:22.315163+00', '2024-09-16 02:55:23.028932+00', 'BMTQpGhtazU_W1BU-WEnoQ', '21db33a2-ee91-4a17-9c8b-2f284e12d82c'),
	('00000000-0000-0000-0000-000000000000', 32, 'ZxJ_QeLQaRi3jTiIWmRCCQ', '2192b2c8-c3e6-4a58-82f1-782d3a1091c4', true, '2024-09-16 02:55:23.030235+00', '2024-09-16 03:53:31.39082+00', 'wxSC-KNXD4Ynh7E7slXeeg', '21db33a2-ee91-4a17-9c8b-2f284e12d82c'),
	('00000000-0000-0000-0000-000000000000', 33, 'oHjTRYzFYEIOADsvbG5BzA', '2192b2c8-c3e6-4a58-82f1-782d3a1091c4', true, '2024-09-16 03:53:31.391627+00', '2024-09-16 06:28:53.386171+00', 'ZxJ_QeLQaRi3jTiIWmRCCQ', '21db33a2-ee91-4a17-9c8b-2f284e12d82c'),
	('00000000-0000-0000-0000-000000000000', 34, 'xnIWJKZIU7bHWOKir7YcdA', '2192b2c8-c3e6-4a58-82f1-782d3a1091c4', true, '2024-09-16 06:28:53.386653+00', '2024-09-16 10:12:47.196675+00', 'oHjTRYzFYEIOADsvbG5BzA', '21db33a2-ee91-4a17-9c8b-2f284e12d82c'),
	('00000000-0000-0000-0000-000000000000', 35, 'uRYrKNYVY5B7somqisXnoA', '2192b2c8-c3e6-4a58-82f1-782d3a1091c4', true, '2024-09-16 10:12:47.197411+00', '2024-09-16 11:12:03.304429+00', 'xnIWJKZIU7bHWOKir7YcdA', '21db33a2-ee91-4a17-9c8b-2f284e12d82c'),
	('00000000-0000-0000-0000-000000000000', 36, 'cXjHgnLpDX94qG1LmMoUkg', '2192b2c8-c3e6-4a58-82f1-782d3a1091c4', true, '2024-09-16 11:12:03.305682+00', '2024-09-16 12:11:36.584988+00', 'uRYrKNYVY5B7somqisXnoA', '21db33a2-ee91-4a17-9c8b-2f284e12d82c'),
	('00000000-0000-0000-0000-000000000000', 37, 'xJ-jrT8HGrU7e-hDVav-Kg', '2192b2c8-c3e6-4a58-82f1-782d3a1091c4', true, '2024-09-16 12:11:36.585854+00', '2024-09-16 21:49:08.17073+00', 'cXjHgnLpDX94qG1LmMoUkg', '21db33a2-ee91-4a17-9c8b-2f284e12d82c');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."users" ("created_at", "type", "id", "loopio_id") VALUES
	('2024-09-14 01:45:24.029545+00', 'user', 'e8da08f6-6f16-4832-b78a-e1dcf965c43d', 218997),
	('2024-09-14 06:16:16.949591+00', 'user', '2192b2c8-c3e6-4a58-82f1-782d3a1091c4', 205137);


--
-- Data for Name: injections; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."injections" ("id", "created_at", "user_id", "text") VALUES
	(1, '2024-09-16 06:28:44.488577+00', '2192b2c8-c3e6-4a58-82f1-782d3a1091c4', 'Just say yes');


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."projects" ("id", "created_at", "user_id", "loopio_project_id", "updated_at", "name") VALUES
	('0a9a46af-d7da-444a-a000-26ed70f2dd50', '2024-09-14 08:59:40.699163+00', '2192b2c8-c3e6-4a58-82f1-782d3a1091c4', 846772, '2024-09-14 08:59:40.699163+00', 'testing name!');


--
-- Data for Name: settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."settings" ("id", "created_at", "user_id", "bucket_id", "model", "temperature", "relevance", "exaggeration") VALUES
	(1, '2024-09-16 22:28:29.724379+00', 'e8da08f6-6f16-4832-b78a-e1dcf965c43d', 11279, 'gpt-4o-mini', 80, 70, 20);


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 41, true);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- Name: injections_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."injections_id_seq"', 1, true);


--
-- Name: settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."settings_id_seq"', 1, true);


--
-- Name: users_loopio_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."users_loopio_id_seq"', 1, false);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;

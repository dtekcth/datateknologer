--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1 (Debian 13.1-1.pgdg100+1)
-- Dumped by pg_dump version 13.1 (Debian 13.1-1.pgdg100+1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Event; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Event" (
    id integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    "maxParticipants" integer NOT NULL,
    "registrationOpens" timestamp(3) without time zone NOT NULL,
    "registrationCloses" timestamp(3) without time zone NOT NULL,
    "imageUrl" text,
    archived boolean DEFAULT false NOT NULL,
    "foodWillBeServed" boolean NOT NULL
);


ALTER TABLE public."Event" OWNER TO root;

--
-- Name: EventRegistration; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."EventRegistration" (
    "eventId" integer NOT NULL,
    email text NOT NULL,
    "foodPreferences" text,
    "verificationCode" text NOT NULL,
    attended boolean DEFAULT false NOT NULL,
    "timestamp" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."EventRegistration" OWNER TO root;

--
-- Name: Event_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public."Event_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Event_id_seq" OWNER TO root;

--
-- Name: Event_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public."Event_id_seq" OWNED BY public."Event".id;


--
-- Name: JobAd; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."JobAd" (
    id integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    "closesOn" timestamp(3) without time zone NOT NULL,
    url text NOT NULL,
    clicks integer DEFAULT 0 NOT NULL,
    "imageUrl" text,
    "timestamp" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."JobAd" OWNER TO root;

--
-- Name: JobAd_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public."JobAd_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."JobAd_id_seq" OWNER TO root;

--
-- Name: JobAd_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public."JobAd_id_seq" OWNED BY public."JobAd".id;


--
-- Name: Profile; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."Profile" (
    id integer NOT NULL,
    name text,
    title text,
    email text,
    "imageUrl" text
);


ALTER TABLE public."Profile" OWNER TO root;

--
-- Name: Profile_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public."Profile_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Profile_id_seq" OWNER TO root;

--
-- Name: Profile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public."Profile_id_seq" OWNED BY public."Profile".id;


--
-- Name: Event id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Event" ALTER COLUMN id SET DEFAULT nextval('public."Event_id_seq"'::regclass);


--
-- Name: JobAd id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."JobAd" ALTER COLUMN id SET DEFAULT nextval('public."JobAd_id_seq"'::regclass);


--
-- Name: Profile id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Profile" ALTER COLUMN id SET DEFAULT nextval('public."Profile_id_seq"'::regclass);


--
-- Data for Name: Event; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Event" (id, title, description, date, "maxParticipants", "registrationOpens", "registrationCloses", "imageUrl", archived, "foodWillBeServed") FROM stdin;
1	Volvo pub	Testa denna koola grejen	2022-10-06 03:17:00	20	2022-09-30 22:00:00	2022-10-03 22:00:00	ZGU3YjY3OTEtMGM4MS00YjU2LTkwZjktOTI2NWY3ZGY4OTg1undefined	t	f
2	Volvo pub	Capture the students in their natural habitat – the lecture hall! During a lunch seminar, you have the opportunity to provide the students with an insight into who you are, what your company does and why you are a unique employer. Lunch seminars are a very popular event, where students are looking forward to discovering you and learn more about you buisness.	2022-10-05 03:17:00	2	2022-09-30 22:00:00	2022-10-03 22:00:00	NGFmMjFjNjUtZjk3MC00ZWJhLWExYjItYTdiYzFiYzU0YTE1undefined	f	t
3	Lunch lecture with Ericsson	Capture the students in their natural habitat – the lecture hall! During a lunch seminar, you have the opportunity to provide the students with an insight into who you are, what your company does and why you are a unique employer. Lunch seminars are a very popular event, where students are looking forward to discovering you and learn more about you buisness.	2022-09-30 10:00:00	20	2022-09-04 22:00:00	2022-09-29 22:00:00	N2M4OGM3YjYtM2MxMS00ODU1LWIxODAtZDkwNDFjZmFmOTdkundefined	f	t
\.


--
-- Data for Name: EventRegistration; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."EventRegistration" ("eventId", email, "foodPreferences", "verificationCode", attended, "timestamp", name) FROM stdin;
1	david@dave.net	nuts	d9ab5e0c-9771-4c3e-be65-7db36e712695	f	2022-09-07 16:23:07.214	David Hedgren
1	david@dav2e.net	nuts	37ac8dd0-da7d-429d-90fd-9899adfba2a8	f	2022-09-08 07:18:47.231	David Hedgren
2	nötter	nuts	974fd06e-e140-4789-97c0-5b0e4a7cec6a	f	2022-09-08 08:10:50.598	David Hedgren
2	david@dave.net	nuts	26d2c7ba-b037-4190-9ef7-4a5afb90ca9c	f	2022-09-08 08:11:21.132	David Hedgren
3	david.hedgren@dtek.se	laktos, nötter	f352858c-3f5a-4d93-9d5d-4e0090903ef7	f	2022-09-08 17:14:36.028	Dave
\.


--
-- Data for Name: JobAd; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."JobAd" (id, title, description, "closesOn", url, clicks, "imageUrl", "timestamp") FROM stdin;
1	Centiro internship	Capture the students in their natural habitat – the lecture hall! During a lunch seminar, you have the opportunity to provide the students with an insight into who you are, what your company does and why you are a unique employer. Lunch seminars are a very popular event, where students are looking forward to discovering you and learn more about you buisness.	2022-10-04 22:00:00	/students	0	MDI1ZDlmYWYtZmQ2MS00NDEwLWFjYmYtMzg1M2IxY2ZmNmE0undefined	2022-09-08 16:58:09.675
\.


--
-- Data for Name: Profile; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Profile" (id, name, title, email, "imageUrl") FROM stdin;
\.


--
-- Name: Event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public."Event_id_seq"', 3, true);


--
-- Name: JobAd_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public."JobAd_id_seq"', 1, true);


--
-- Name: Profile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public."Profile_id_seq"', 1, false);


--
-- Name: EventRegistration EventRegistration_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."EventRegistration"
    ADD CONSTRAINT "EventRegistration_pkey" PRIMARY KEY ("verificationCode");


--
-- Name: Event Event_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Event"
    ADD CONSTRAINT "Event_pkey" PRIMARY KEY (id);


--
-- Name: JobAd JobAd_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."JobAd"
    ADD CONSTRAINT "JobAd_pkey" PRIMARY KEY (id);


--
-- Name: Profile Profile_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."Profile"
    ADD CONSTRAINT "Profile_pkey" PRIMARY KEY (id);


--
-- Name: EventRegistration EventRegistration_eventId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public."EventRegistration"
    ADD CONSTRAINT "EventRegistration_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES public."Event"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--


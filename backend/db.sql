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
    "foodWillBeServed" boolean NOT NULL,
    archived boolean DEFAULT false NOT NULL,
    "mailTemplate" text
);


ALTER TABLE public."Event" OWNER TO root;

--
-- Name: EventRegistration; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public."EventRegistration" (
    "eventId" integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    "foodPreferences" text,
    "timestamp" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "verificationCode" text NOT NULL,
    attended boolean DEFAULT false NOT NULL
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

COPY public."Event" (id, title, description, date, "maxParticipants", "registrationOpens", "registrationCloses", "imageUrl", "foodWillBeServed", archived, "mailTemplate") FROM stdin;
1	Centiro Pub	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \n\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.	2022-10-30 04:17:00	20	2022-09-29 22:00:00	2022-10-24 22:00:00	ODY3N2Y2ZDItYTc1ZS00NjU0LWIzNmUtMTQ1NWEwYmUwZDg4jpg	t	f	Hello <b>Test</b>
\.


--
-- Data for Name: EventRegistration; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."EventRegistration" ("eventId", name, email, "foodPreferences", "timestamp", "verificationCode", attended) FROM stdin;
1	Dave	david.hedgren@dtek.se	laktos, nötter	2022-10-18 08:56:24.41	7deb3262-3d21-437d-a0ba-8072a73deb64	f
\.


--
-- Data for Name: JobAd; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."JobAd" (id, title, description, "closesOn", url, clicks, "imageUrl", "timestamp") FROM stdin;
\.


--
-- Data for Name: Profile; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public."Profile" (id, name, title, email, "imageUrl") FROM stdin;
\.


--
-- Name: Event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public."Event_id_seq"', 1, true);


--
-- Name: JobAd_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public."JobAd_id_seq"', 1, false);


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


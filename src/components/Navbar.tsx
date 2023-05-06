import { useEffect, useState, } from 'react';
import { createStyles, Navbar, Group, Code, getStylesRef, rem } from '@mantine/core';
import {
  Home,
  MessageCircle2,
  MessageChatbot,
  MoodSmileBeam,
  SwitchHorizontal,
  Logout,
  UserCircle
} from 'tabler-icons-react';
import Link from 'next/link'
import Router,{useRouter} from 'next/router'

const useStyles = createStyles((theme) => ({
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.md,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    marginBottom: theme.spacing.lg,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,

      [`& .${getStylesRef('icon')}`]: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef('icon'),
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      [`& .${getStylesRef('icon')}`]: {
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      },
    },
  },
}));

const data = [
  { link: '/', label: 'Home', icon: Home },
  { link: '/CreatePost', label: 'Post', icon: MessageCircle2 },
  { link: '/Profile', label: 'Profile', icon: UserCircle },
];

export default function NavbarSimple() {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState(data[0].label);
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = () => {
      const path = router.pathname;
      const label = data.find((item) => item.link === path)?.label;
      if (label) {
        setActive(label);
      }
    };

    handleRouteChange(); 

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, router.pathname]);
  const links = data.map((item) => (
    <Link href={item.link} key={item.label} className={cx(classes.link, { [classes.linkActive]: item.label === active })}
      onClick={(event) => {
        event.preventDefault();
        router.push(item.link)
      }}
    >
      <item.icon className={classes.linkIcon} strokeWidth={1.5} />
      <span>{item.label}</span>
    </Link>
  ));
  return (
    <Navbar height={700} width={{ sm: 300 }} p="md">
      <Navbar.Section grow>
        <Group className={classes.header} >
          <MessageChatbot size={28} />
          <span style = {{fontWeight:'bold',fontSize:'24px'}}>ChatBox</span>
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <SwitchHorizontal className={classes.linkIcon} strokeWidth={1.5} />
          <span>Change account</span>
        </a>

        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <Logout className={classes.linkIcon} strokeWidth={1.5} />
          <span>Logout</span>
        </a>
      </Navbar.Section>
    </Navbar>
  );
}
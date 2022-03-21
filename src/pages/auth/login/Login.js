import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import { toast } from 'react-toastify';
import md5 from 'md5';
import ReCAPTCHA from 'react-google-recaptcha';
import constantes from '../../../utils/constantes';
import isMobile from '../../../utils/isMobile';
import Progress from '../../../components/progressBar/Progress';
import api from '../../../service/api';
import { isAuthenticated, removeToken, setToken } from '../../../service/auth';
import { Container, LoginContainer } from './stylesLogin';
import { Input, Button } from '../../../components/commonComponents/commonComponents';

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const recaptchaRef = React.createRef();
    const [recaptch, setRecaptch] = useState();

    const email = location?.state?.email || localStorage.getItem(constantes.storageEmail);

    const [user, setUser] = useState({
        Device: isMobile() ? 0 : 1,
        Password: '',
        Email: email || '',
    });

    const [stateProgress, setStateProgress] = useState({
        isAnimating: false,
        key: 0,
    });

    async function login(event) {
        event.preventDefault();
        try {
            const senhaPadrao = 'e19d5cd5af0378da05f63f891c7467af';
            toogleProgressBar();
            let ip = await getIP();
            if (!ip) throw { message: 'Impossivel Pegar IP' };

            let { data: token } = await api.post('/api/docflix/Login', {
                ...user,
                ip,
            });
            toogleProgressBar();
            setToken(token);

            acessarSistema();
            // if (senhaPadrao !== user.Password) return acessarSistema();
            // acessarSistemaTrocandoSenha();
        } catch (error) {
            toogleProgressBar();
            let mensagemErro = error?.response?.data?.Message || error.message;
            if (mensagemErro === 'Erro, email não confirmado!') {
                toast.warning('Seu email ainda não foi verificado!');
                // setEmailNaoVerificado(true);
                setRecaptch(true);
            } else {
                toast.error(mensagemErro || 'Erro ao tentar logar!');
            }

            console.log(error, error.response);
        }
    }

    function acessarSistemaTrocandoSenha() {
        toast.warning('Sua senha precisa ser atualizada.');
    }

    function getIP() {
        return new Promise(async (resolve) => {
            try {
                let { data: ip } = await api.get('/api/ip/getip');
                resolve(ip);
            } catch (error) {
                console.log(error);
                resolve(false);
            }
        });
    }

    function toogleProgressBar() {
        setStateProgress((prevState) => ({
            isAnimating: !prevState.isAnimating,
            key: prevState.isAnimating ? prevState.key : prevState.key ^ 1,
        }));
    }

    function setEmail(email) {
        localStorage.setItem(constantes.storageEmail, email);
        setUser({ ...user, Email: email });
    }

    function acessarSistema() {
        let pagina = location?.state?.from;
        if (pagina) return navigate(pagina);
        navigate('/app', { replace: true });
    }

    return (
        <Container>
            {/* <Progress isAnimating={stateProgress.isAnimating} key={stateProgress.key} /> */}

            <LoginContainer>
                <div>
                    <h1>Jornada Educativa</h1>
                    <form onSubmit={login}>
                        <div>
                            <span>Email</span>
                            <input
                                type="email"
                                value={user.Email}
                                placeholder="Digite aqui seu email"
                                onChange={(e) => setEmail(e.target.value.trim())}
                                required
                            />
                        </div>
                        <div>
                            <span>Senha</span>
                            <input
                                type="password"
                                placeholder="Digite aqui sua senha"
                                onChange={(e) => setUser({ ...user, Password: md5(e.target.value.trim()) })}
                                required
                            />
                        </div>
                        <div>
                            <Button
                                style={{ width: '100%', textAlign: 'center', justifyContent: 'center', marginBottom: '10px' }}
                                backgroundColorProps="#1564a6"
                                hoverBackgroundColorProps="#154a77"
                            >
                                Acessar
                            </Button>
                            <Link
                                to={{
                                    pathname: '/begin_password_reset',
                                    state: { email: user.Email },
                                }}
                            >
                                Esqueci minha senha
                            </Link>
                        </div>
                    </form>
                </div>
            </LoginContainer>
        </Container>
    );
}

export default Login;

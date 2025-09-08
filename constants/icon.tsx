import Feather from 'react-native-vector-icons/Feather';

export const icon = {
    index: (props: any) => (
        <Feather name='home' size={24} {...props} />
    ),
    explore: (props: any) => (
        <Feather name='compass' size={24} {...props} />
    ),
    profile: (props: any) => (
        <Feather name='user' size={24} {...props} />
    ),
    support: (props: any) => (
        <Feather name='headphones' size={24} {...props} />
    ),
    alert: (props: any) => (
        <Feather name='bell' size={24} {...props} />
    ),
}
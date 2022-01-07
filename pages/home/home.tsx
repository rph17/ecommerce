// components/Hello.tsx
import React from 'react';
import { View, Text, Image, Touchable, TouchableOpacity, FlatList } from 'react-native';
import {geral, margins, imgs} from '../../styles'
import api from '../../services/api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
    Home: {carrinhoQtd: number, navigation: any};
    Carrinho: undefined;
  };
  
type Props = NativeStackScreenProps<RootStackParamList>;

export interface ImgProduto {
    height: number;
    width: number;
    id: string;
    url: string;
}

export interface Produto {
    bred_for: string;
    breed_group: string;
    height: Object;
    id: number;
    image: ImgProduto;
    life_span: string;
    name: string;
    origin: string;
    reference_image_id: string;
    temperament: string;
    qtd?: number;
}

interface State {
  produtos:[Produto];
  carrinho:[Produto];
  loading: boolean
}

export function Menu(props) {
    const Menu = {
        headerRight: () => <TouchableOpacity onPress={() => props.navigation.navigate('Carrinho', ) }>
                        <Image source={imgs.iconCarrinho}  style={geral.iconMenu} />
                        {props.route.params?.carrinhoQtd > 0 ?
                            <View style={{backgroundColor: 'red', borderRadius: 80, height: 10, width:10, position: 'absolute', alignSelf:"flex-end"}} />
                        :
                        null}
                    </TouchableOpacity>,
        title: ""
    }
    return Menu;
}
export default class HomeScreen extends React.Component<Props, State> {
  
    
  constructor(props: Props) {
    super(props);
    // this.props.navigation.setParams({carrinhoQtd: 0});
    console.log("Props", props.route.params)
    props.navigation.setOptions(Menu(props));

    this.state = {
      produtos: [null],
      carrinho: [null],
      loading: true
    };
  }
  
 
  async componentDidMount(): Promise<void> {
    try {
      await AsyncStorage.removeItem('@carrinho');
      await api.get('breeds?limit=10&page=0').
      then((resp) => {
          // console.log('Res', resp);
          this.setState({produtos: resp.data, loading: false});
      })
    } catch (e) {
      // saving error
      console.log("ErroInit", e)
    }
      
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
      console.log("DidUpdate", prevState, prevProps);
  }

  addPrd = async(prd) => {
    console.log(prd);
    prd.qtd = 1;

    this.setState({carrinho: prd});
    try {
      let prdsAnt = await AsyncStorage.getItem('@carrinho');
      // console.log(prdsAnt);
      if (prdsAnt == null) {
        let prds = [];
        prds.push(prd);
        await AsyncStorage.setItem('@carrinho', JSON.stringify(prds));
      } else {
        let ant = JSON.parse(prdsAnt);
        let juncao = [...ant, prd];
        await AsyncStorage.setItem('@carrinho', JSON.stringify(juncao));
      }
    } catch (e) {
      // saving error
      console.log("Deu ruim", e)
    }
  }

  remPrd = async(prd, index) => {
    delete prd.qtd;
    try {
        let dados = JSON.parse(await AsyncStorage.getItem('@carrinho'));
        let indexDel = null;
        dados.map((item, index) => {
          if (item.id == prd.id) {
            indexDel  = index;
          }
        });
        dados.splice(indexDel, 1);
        await AsyncStorage.setItem('@carrinho', JSON.stringify(dados));
        this.setState({produtos: this.state.produtos})
    } catch (e) {
      // saving error
      console.log("Deu ruim", e)
    }


  }

  renderItens = ({item, index}) =>{
    return(<View style={[geral.flex, margins.mr8n]}>
                <Image source={{uri: item.image.url}} style={geral.imgBox} />
                <Text style={[margins.mt8n]}>
                    {item.name}
                </Text>
                <TouchableOpacity onPress={() => item.qtd != undefined? this.remPrd(item,index) : this.addPrd(item)} style={{ backgroundColor: item.qtd != undefined? 'red' : 'green', padding: 8, marginTop:8}}>
                    <Text style={{color: '#FFF', textAlign: 'center'}}>
                    {item.qtd != undefined? 'Remove': 'Add'}
                    </Text>
                </TouchableOpacity>
            </View>);
  }

  

  render() {
    if (this.state.loading) {
      return(<View style={[geral.alignItemCenter, geral.justifyContentCenter]}>
                  <Text>Carregando...</Text>
              </View>);
    } else {
      return (
          <View style={geral.flex}>
          <FlatList 
              data={this.state.produtos}
              keyExtractor={(item, i) => i + item.name}
              contentContainerStyle={[margins.mt16n, margins.mx16n]}
              ItemSeparatorComponent={() => <View style={margins.mb16n} />}
              numColumns={2}
              renderItem={this.renderItens}                     
          />
        </View>
      );
    }
  }
}
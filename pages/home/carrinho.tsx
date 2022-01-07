// components/Hello.tsx
import React from 'react';
import { View, Text, Image, Touchable, TouchableOpacity, FlatList } from 'react-native';
import {geral, margins} from '../../styles'
import api from '../../services/api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
    Home: {carrinhoQtd: number, navigation: any, atualiza: boolean};
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

export default class CarrinhoScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    console.log("Props", props.route.params)

    this.state = {
      produtos: [null],
      carrinho: [null],
      loading: true
    };
  }

 
  async componentDidMount(): Promise<void> {
    try {
      this.setState({loading: true});
      let prdsAnt = await AsyncStorage.getItem('@carrinho');
      console.log(prdsAnt);
      if (prdsAnt == null) {
        alert("Não tem produtos!")
      } else {
        let prds = JSON.parse(prdsAnt);
        console.log("prds", prds);
        this.setState({produtos: prds, loading: false});
      }
    } catch (e) {
      // saving error
      console.log("Deu ruim", e)
    }
  }

  remPrd = async(prd, index) => {
    let prds = this.state.produtos;

    prds.splice(index, 1);

    try {
        await AsyncStorage.setItem('@carrinho', JSON.stringify(prds));
        this.setState({produtos: prds});
    } catch (e) {
      // saving error
      console.log("Deu ruim", e)
    }


  }

renderItens = ({item, index}) =>{
    return(<View style={[margins.mr8n, geral.lineBottom, margins.mb8n, geral.flexRow, geral.alignItemCenter, geral.justifyContentBetween]}>
                <View style={[geral.flexRow, geral.alignItemCenter, margins.ml8n]}>
                    <Image source={{uri: item.image.url}} style={geral.imgLine} />
                    <Text style={[margins.mt8n, margins.ml8n]}>
                        {item.name}
                    </Text>
                </View>
                
                <TouchableOpacity onPress={() => this.remPrd(item, index)} style={geral.buttonDel}>
                    <Text style={{color: '#FFF', textAlign: 'center'}}>
                    X
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
                  <Text style={margins.mx8n}>
                    {this.state.produtos.length} produtos adicionados:
                  </Text>

                <FlatList
                 data={this.state.produtos}
                 renderItem={this.renderItens}
                 contentContainerStyle={[margins.mt16n]}
                 />
          </View>
        );
      }
  }
}
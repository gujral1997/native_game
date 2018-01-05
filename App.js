import React,{Component} from 'react';
import {AppRegistry,StyleSheet, Text, View,Dimensions,Animated,Image,ImageBackground } from 'react-native';
import Enemy from './Enemy';
export default class App extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      movePlayerVal:new Animated.Value(40),
      playerSide:'left',
      points:0,
      moveEnemyVal:new Animated.Value(0),
      enemyStartposX:0,
      enemySide:'left',
      enemySpeed:4200,
      gameOver:false,
    }
  }
  render() {
    return (

      <ImageBackground source={require('./assets/bg.png')} style={styles.container}>
      <View style={{flex:1,alignItems:'center',marginTop:80}}>
        <View style={styles.points}>
          <Text style={{fontWeight:'bold',fontSize:40}}>{this.state.points}</Text>
        </View>
      </View>
     <Animated.Image source={require('./assets/car.png')} style={{
        height:100,
        width:100,
        position:'absolute',
        zIndex:1,
        bottom:50,
        resizeMode:'stretch',
        transform:[
          {translateX:this.state.movePlayerVal}
        ]
      }}></Animated.Image>
      <Enemy enemyImg={require('.//assets/car2.png')}
      enemyStartposX={this.state.enemyStartposX}
      moveEnemyVal={this.state.moveEnemyVal}/>

      <View style={styles.controls}>
      <Text style={styles.left} onPress={()=>this.movePlayer('left')}>{'<'}</Text>
      <Text style={styles.right} onPress={()=>this.movePlayer('right')}>{'>'}</Text>
      </View>
      </ImageBackground>

    );
  }
  movePlayer(direction)
  {
    if(direction=='right')
    {
      this.setState({playerSide:'right'});
      Animated.spring(
        this.state.movePlayerVal,
        {
          toValue:Dimensions.get('window').width-140,
          tension:120,
        }
      ).start();
    }
    else if(direction=='left')
    {
      this.setState({playerSide:'left'});
      Animated.spring(
        this.state.movePlayerVal,
        {
          toValue:40,
          tension:120,
        }
      ).start();
    }
  }
  componentDidMount()
  {
    this.animateEnemy();
  }
  animateEnemy()
  {
   //this.moveEnemyval.setValue(-100);
    var windowH=Dimensions.get('window').height;
    var r=Math.floor(Math.random()*2)+1;
    if(r==2)
    {
      r=40;
      this.setState({enemySide:'left'});
    }
    else
      {
        r=Dimensions.get('window').width-140;
        this.setState({enemySide:'right'});
      }
      this.setState({enemyStartposX:r});
      var refreshIntervalid;
      refreshIntervalid=setInterval(()=>
    {
      if(this.state.moveEnemyVal._value>windowH-280
        &&this.state.moveEnemyVal._value<windowH-180
      &&this.state.moveEnemyVal._value==this.state.enemySide)
      {
        clearInterval(refreshIntervalid);
        this.setState({gameOver:true});
        this.gameOver();l
      }
    },50);
    //Increent Enemy speed each 20th second
    setInterval(()=>
  {
    this.setState({enemySpeed:this.state.enemySpeed-50})
  },20000);
  //Animate the enemy
  Animated.timing(
    this.state.moveEnemyVal,
    {
      toValue:Dimensions.get('window').height,
      duration:this.state.enemySpeed,
    }

  ).start(event=>
    //if no collison occurs
  {
    if(event.finished&&this.state.gameOver==false)
    {
      clearInterval(refreshIntervalid);
      this.setState({points:++this.state.points})
      this.animateEnemy();
    }
  });

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position:'relative',
  },
  points:{
    width:80,
    height:80,
    backgroundColor:'#fff',
    borderRadius:100,
    alignItems:'center',
    justifyContent:'center',
  },
  controls:
  {
    alignItems:'center',
    flexDirection:'row',
  },
  right:
  {
    flex:1,
    color:'#666',
    margin:0,
    fontSize:60,
    fontWeight:'bold',
    textAlign:'left'
  },
  left:
  {
    flex:1,
    color:'#666',
    margin:0,
    fontSize:60,
    fontWeight:'bold',
    textAlign:'right'
  }
});
AppRegistry.registerComponent('game1', () => App);

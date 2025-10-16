import React, { useEffect, useState } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import TodoItem from '../../components/TodoIttem/TodoItem';
import { useAppContext } from '../../context/AppContext';

import { styles } from './Home.styles';

const Home = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const { text, setText, todos, addTodo, isEditting, editTodo } =
    useAppContext();
  const inputRef = React.useRef<TextInput>(null);

  useEffect(() => {
    handleAuthentication();
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditting]);

  const handleAuthentication = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate to access the app',
    });

    if (result.success) {
      setAuthenticated(true);
    }
  };

  if (!authenticated) return <View />;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <FlatList
          data={todos}
          renderItem={({ item }) => <TodoItem todo={item} />}
          keyExtractor={item => item.id.toString()}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          testID="add-todo-input"
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Add a todo..."
          placeholderTextColor="#999"
          maxLength={500}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={isEditting ? editTodo : addTodo}
          disabled={!text.trim()}
          testID="add-todo-button"
        >
          <Text
            style={[
              styles.sendButtonText,
              !text.trim() && styles.sendButtonDisabled,
            ]}
          >
            {isEditting ? 'SAVE' : 'ADD'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Home;

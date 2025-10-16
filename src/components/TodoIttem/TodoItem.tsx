import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { styles } from './TodoItem.styles';
import Checkbox from 'expo-checkbox';
import { useAppContext } from '../../context/AppContext';
import { Todo } from '../../types';

export default function TodoItem({ todo }: { todo: Todo }) {
  const {
    deleteTodo,
    selectedTodo,
    setSelectedTodo,
    toggleCompleted,
    setIsEditting,
    setText,
  } = useAppContext();

  return (
    <View>
      <Pressable
        style={styles.todoItem}
        onPress={() => {
          setIsEditting(false);
          setSelectedTodo(todo);
        }}
        testID={`select-todo-${todo.id}`}
      >
        <Checkbox
          value={todo.completed}
          onValueChange={() => toggleCompleted(todo.id)}
          testID={`complete-checkbox-${todo.id}`}
        />
        <Text
          numberOfLines={3}
          style={[styles.todoItemText, todo.completed && styles.completed]}
        >
          {todo.text}
        </Text>
        {todo.id === selectedTodo?.id && (
          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.editButton}
              onPress={() => {
                setIsEditting(true);
                setText(selectedTodo?.text || '');
              }}
              testID={`edit-todo-${todo.id}`}
            >
              <Text style={styles.text}>Edit</Text>
            </Pressable>
            <Pressable
              style={styles.deleteButton}
              onPress={() => deleteTodo()}
              testID={`delete-todo-${todo.id}`}
            >
              <Text style={styles.text}>Delete</Text>
            </Pressable>
          </View>
        )}
      </Pressable>
    </View>
  );
}

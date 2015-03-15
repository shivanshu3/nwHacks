package com.example.nwhacks;


public class Page{
	
	private String Name;
	private String Description;
	private String ImageURL;
	private int NumberOfLikes;
	
	public Page(){
		
	}
	
	public void setName(String name){
		this.Name = name;
	}
	
	public String getName(){
		return Name;
	}
	
	public void setDescription(String desc){
		this.Description = desc;
	}
	
	public String getDescription(){
		return Description;
	}
	
	public void setImageURL(String url){
		this.ImageURL = url;
	}
	
	public String getImageURL(){
		return ImageURL;
	}
	
	public int getNumberOfLikes(){
		return NumberOfLikes;
	}
	
	public void setNumberOfLikes(int likes){
		this.NumberOfLikes = likes;
	}
	
}
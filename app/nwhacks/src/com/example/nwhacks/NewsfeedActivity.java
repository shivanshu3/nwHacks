package com.example.nwhacks;

import com.example.nwhacks.CustomListAdapter;
import com.example.nwhacks.AppController;

 
import java.util.ArrayList;
import java.util.List;
 
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
 
import android.app.Activity;
import android.app.ProgressDialog;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.widget.ListView;
 
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.JsonArrayRequest;
import com.example.nwhacks.Page;

public class NewsfeedActivity extends Activity {
   
 
    // Movies json url
    private static final String url = "http://api.androidhive.info/json/movies.json";
    private ProgressDialog pDialog;
    private List<Page> pageList = new ArrayList<Page>();
    private ListView listView;
    private CustomListAdapter adapter;
 
    @Override
    protected void onCreate(Bundle savedInstanceState) {
    	
    	//Query server to get data on things we want to display
    	int numberOfEntries = 10;
    	
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
 
        listView = (ListView) findViewById(R.id.list);
        adapter = new CustomListAdapter(this, pageList);
        listView.setAdapter(adapter);
 
        pDialog = new ProgressDialog(this);
        // Showing progress dialog before making http request
        pDialog.setMessage("Loading...");
        pDialog.show();
 
        // changing action bar color
        getActionBar().setBackgroundDrawable(
                new ColorDrawable(Color.parseColor("#1b1b1b")));
 
        for(int i = 0; i < numberOfEntries; i++){
    		
    		Page temp = new Page();
    		temp.setName("McGillicuddy");
    		temp.setDescription("Monk! I need a Monk");
    		temp.setImageURL("http://blog.room34.com/wp-content/uploads/underdog/logo.thumbnail.png");
    		temp.setNumberOfLikes(9);
    		
    		pageList.add(temp);
    	}

    }
 
    @Override
    public void onDestroy() {
        super.onDestroy();
        hidePDialog();
    }
 
    private void hidePDialog() {
        if (pDialog != null) {
            pDialog.dismiss();
            pDialog = null;
        }
    }
 
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }
 
}